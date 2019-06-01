import chalk from 'chalk'
import { Channel, Client, Guild, TextChannel } from 'discord.js'
import * as dotenv from 'dotenv'
import { createWriteStream, mkdir } from 'fs'
import { WriteStream } from 'fs'
import * as path from 'path'
import { forkJoin, from, Observable, of } from 'rxjs'
import { inspect } from 'util'

dotenv.config()

interface Test {
  data: () => Observable<object>
  file: string
}

const client = new Client()

const testDataFiles: Test[] = [
  {
    data: () => from(client.channels.values()),
    file: 'channels.md',
  },
  {
    data: () => from(client.guilds.values()),
    file: 'guilds.md',
  },
  {
    data: () => of(client),
    file: 'client.md',
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
    file: 'messages.md',
  },
]

function writeObjectToWriteStream(writeStream: WriteStream, obj: object) {
  writeStream.write(
    '```javascript\n' + inspect(obj, { showHidden: true }) + '\n```\n'
  )
}

function writeTestToWriteStream(writeStream: WriteStream, test: Test) {
  console.log(chalk.greenBright(`Writing ${test.file}`))
  return test.data().subscribe(value => {
    writeObjectToWriteStream(writeStream, value as object)
  })
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
        return of(writeTestToWriteStream(writeStream, test))
      })

      forkJoin(tests).subscribe({
        complete: () => {
          client.destroy().then(() => {
            console.log(chalk.greenBright('Your test data feels refreshed.'))
          })
        },
        error: err => {
          logError(err)
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
