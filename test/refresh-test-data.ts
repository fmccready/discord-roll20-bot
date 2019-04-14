import chalk from 'chalk'
import {Client} from 'discord.js'
import * as dotenv from 'dotenv'
import {createWriteStream, mkdir} from 'fs'
import * as path from 'path'
import {inspect} from 'util'

dotenv.config()

const dataDir = path.join(__dirname, 'data')

const clientFile = path.join(dataDir, 'client.json')
const client = new Client()
const channelsFile = path.join(dataDir, 'channels.json')
const channels = client.channels.values()
const guildsFile = path.join(dataDir, 'guilds.json')
const guilds = client.guilds.values()
const messagesFile = path.join(dataDir, 'messages.json')

function writeIterableToFile(file: string, iterable: IterableIterator<any>) {
  mkdir(dataDir, () => {
    const fileStream = createWriteStream(file, {flags: 'w'})
    fileStream.write('{')

    let i = iterable.next()
    while (!i.done) {
      fileStream.write(`\n"${i.value.id}": ${JSON.stringify(i.value, null, 2)}`)
      i = iterable.next()
      if (!i.done) fileStream.write(',')
    }

    fileStream.write('}')
    fileStream.end()
  })
}

function writeObjectToFile(file: string, object: object) {
  mkdir(dataDir, () => {
    const fileStream = createWriteStream(file, {flags: 'w'})
    fileStream.write(inspect(object, {showHidden: true}))
    fileStream.end()
  })
}

client.login(process.env.TOKEN).then(() => {
  console.log(client.guilds.size)
  client.guilds.find((value, key, collection) => {
    console.log(value, key, collection)
    return value.name === 'roll20bottest'
  })
  writeIterableToFile(channelsFile, channels)
  writeIterableToFile(guildsFile, guilds)
  writeObjectToFile(clientFile, client)

  client.destroy().then(() => {
    console.log(chalk.greenBright('Your test data feels refreshed.'))
  })
}).catch((err) => {
  console.log(
    chalk.redBright(err),
    chalk.red('\nSomething went wrong. Test data is not refreshed.'),
  )
})
