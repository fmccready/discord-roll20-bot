import chalk from 'chalk'
import { Client } from 'discord.js'
import * as dotenv from 'dotenv'
import { createWriteStream, mkdir } from 'fs'
import { WriteStream } from 'fs'
import * as path from 'path'
import { inspect } from 'util'

dotenv.config()

interface TestDataWriter {
  data: () => object | Iterable<any>
  file: string
  writer: (writeStream: WriteStream, data: any) => void
}

const client = new Client()

const testDataFiles: TestDataWriter[] = [
  {
    data: () => client.channels.values(),
    file: 'channels.json',
    writer: writeIterableToWriteStream,
  },
  {
    data: () => client.guilds.values(),
    file: 'guilds.json',
    writer: writeIterableToWriteStream,
  },
  {
    data: () => client,
    file: 'client.txt',
    writer: writeObjectToWriteStream,
  },
  {
    data: () => client
      .guilds.find((guild) => guild.name === 'roll20bottest')
      .channels.find((channel) => channel.name === 'general'),
    file: 'test.txt',
    writer: writeObjectToWriteStream,
  }
]

function writeIterableToWriteStream(
  writeStream: WriteStream,
  iterable: IterableIterator<any>,
) {
  writeStream.write('{')

  let data = iterable.next()
  while (!data.done) {
    writeStream.write(
      `\n"${data.value.id}": ${JSON.stringify(data.value, null, 2)}`,
    )
    data = iterable.next()
    if (!data.done) writeStream.write(',')
  }

  writeStream.write('}')
}

function writeObjectToWriteStream(writeStream: WriteStream, obj: object) {
  writeStream.write(inspect(obj, { showHidden: true }))
}

const dataDir = path.join(__dirname, 'data')
client
  .login(process.env.TOKEN)
  .then(() => {
    mkdir(dataDir, () => {
      testDataFiles.forEach(test => {
        const writeStream = createWriteStream(path.join(dataDir, test.file), { flags: 'w' })
        test.writer(writeStream, test.data())
        writeStream.end()
      })

      client.destroy().then(() => {
        console.log(chalk.greenBright('Your test data feels refreshed.'))
      })
    })
  })
  .catch(err => {
    console.log(
      chalk.redBright(err),
      chalk.red('\nSomething went wrong. Test data is not refreshed.'),
    )
  })
