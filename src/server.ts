import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import Discord from 'discord.js'
import express from 'express'
import { messageHandler } from './bot'
import './bot/command'
import './postgres'
export const app = express()
const client = new Discord.Client()

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.use(express.static(__dirname + '/../dist/frontend'))

app.post('/message', function(req, res) {
  console.log('body: ' + req.body)

  const content = req.body || req.body.content
  console.log('content: ' + content)
  if (!content) {
    res.status(400).send('Request cannot be empty')
  }

  client.emit('message', {
    channel: {
      type: content.type,
    },
    content: content.message,
    id: content.id,
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
  res.status(200).sendFile('/dist/frontend/index.html')
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
