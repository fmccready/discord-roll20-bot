import chalk from 'chalk'
import { Client, TextChannel } from 'discord.js'
import * as dotenv from 'dotenv'
import { createWriteStream, mkdir } from 'fs'
import { WriteStream } from 'fs'
import { stringify } from 'json-cycle'
import * as path from 'path'
import {
  bindNodeCallback,
  forkJoin,
  from,
  Observable,
  of,
  throwError,
} from 'rxjs'
import { flatMap } from 'rxjs/operators'

import { inspect } from 'util'

dotenv.config()

interface Test {
  data: () => Observable<object>
  file: string
}
type ObservableWrite = (arg: string, encoding: string) => Observable<boolean[]>

const client = new Client()

const testDataFiles: Test[] = [
  {
    data: () => from(client.channels.values()),
    file: 'channels.json',
  },
  {
    data: () => from(client.guilds.values()),
    file: 'guilds.json',
  },
  {
    data: () => of(client),
    file: 'client.json',
  },
  {
    data: () => {
      const textChannel = client.guilds
        .find(guild => guild.name === 'roll20bottest')
        .channels.find(
          channel => channel.name === 'general' && channel.type === 'text'
        ) as TextChannel
      return from(
        textChannel.fetchMessages({ limit: 10 }).then(messages => {
          return messages.values()
        })
      )
    },
    file: 'messages.json',
  },
]

function observableWrite(
  writeStream: WriteStream,
  obj: object
): ObservableWrite {
  console.log(chalk.grey('Writing to stream ', obj.toString()))

  return bindNodeCallback((batch: string, encoding: string, callback) =>
    writeStream.write(batch, encoding, callback)
  )
}

function writeTestToWriteStream(writeStream: WriteStream, test: Test) {
  console.log(chalk.dim(`Writing ${test.file}`))

  return test.data().pipe(
    flatMap(value => {
      if (test.file.match(/.md$/))
        return observableWrite(writeStream, value).call(
          writeStream,
          '```javascript\n' + inspect(value, { showHidden: true }) + '\n```\n'
        )
      else if (test.file.match(/.json$/))
        return observableWrite(writeStream, value).call(
          writeStream,
          `${stringify(value)},`
        )
      else
        return throwError(
          `File extension for ${
            test.file
          } does not have a method to write to that type of file.`
        )
    })
  )
}

const dataDir = path.join(__dirname, 'data')
client
  .login(process.env.TOKEN)
  .then(() => {
    mkdir(dataDir, () => {
      const tests = testDataFiles.map(test => {
        const writeStream = createWriteStream(path.join(dataDir, test.file), {
          flags: 'w',
        })
        return writeTestToWriteStream(writeStream, test)
      })

      forkJoin(tests).subscribe({
        complete: () => {
          client.destroy()
          console.log(chalk.greenBright('Your test data feels refreshed.'))
        },
        error: err => {
          logError(err)
          client.destroy()
          console.log(chalk.red('Client destroyed after error.'))
        },
      })
    })
  })
  .catch(err => {
    logError(err)
  })

function logError(err) {
  console.log(
    chalk.redBright(err),
    chalk.red('\nSomething went wrong. Test data is not refreshed.')
  )
}
