import * as dotenv from 'dotenv'
dotenv.config()
import * as bodyParser from 'body-parser'
import * as Discord from 'discord.js'
import * as express from 'express'
import * as path from 'path'
import { messageHandler } from './bot'
import './bot/command'
import './postgres'

export const app = express()
const client = new Discord.Client()

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())

app.use(express.static(__dirname + '/frontend'))

app.post('/message', function(req, res) {
  console.log(req.body[0].value)
  client.emit('message', {
    content: req.body[0].value,
    reply: function(response) {
      console.log(response)
      res.send(response)
    },
  })
})

app.get('/', (req, res) => {
  client.generateInvite(['SEND_MESSAGES', 'MENTION_EVERYONE']).then(link => {
    console.log(`Bot invite link: ${link}`)
  })
  res.status(200).sendFile(path.join(__dirname, 'frontend/index.html'))
})
app.get('/invite', (req, res) => {
  client.generateInvite(['SEND_MESSAGES', 'MENTION_EVERYONE']).then(link => {
    res.status(200).send(link)
  })
})
app.listen(process.env.PORT || 8080, () => {
  console.info(`Running on port ${process.env.PORT || 8080}`)
})

client.on('ready', () => {
  console.log(`logged in as ${client.user.tag}`)
})

client.on('message', messageHandler)
client.login(process.env.TOKEN)
