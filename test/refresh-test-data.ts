import chalk from 'chalk'
import {Client} from 'discord.js'
import * as dotenv from 'dotenv'
import {createWriteStream, mkdir} from 'fs'
import * as path from 'path'

dotenv.config()

const dataDir = path.join(__dirname, 'data')

const client = new Client()
const channelsFile = path.join(dataDir, 'channels.json')
const channels = client.channels.values()
const guildsFile = path.join(dataDir, 'guilds.json')
const guilds = client.guilds.values()

function writeIterableToFile(file: string, iterable: IterableIterator<any>) {
  mkdir(dataDir, () => {
    const fileStream = createWriteStream(file)
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

client.login(process.env.TOKEN).then(() => {
  writeIterableToFile(channelsFile, channels)
  writeIterableToFile(guildsFile, guilds)
  client.destroy().then(() => {
    console.log(chalk.greenBright('Your test data feels refreshed.'))
  })
}).catch((err) => {
  console.log(
    chalk.redBright(err),
    chalk.red('\nSomething went wrong. Test data is not refreshed.'),
  )
})
