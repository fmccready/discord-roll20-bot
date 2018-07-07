require('dotenv').config()
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import * as Discord from 'discord.js'
import bot from './bot'
import './postgres'
import './bot/command'

const app = express()
const client = new Discord.Client()

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.use(express.static(__dirname + '/frontend'))

app.post('/message', function(req, res) {
  client.emit('message', {
    reply: function(response) {
      res.send(response)
    },
    content: req.body[0].value,
  })
})

/*
app.get('/', (req, res) => {
    client.generateInvite(['SEND_MESSAGES', 'MENTION_EVERYONE']).then(link => {
        console.log(`Bot invite link: ${link}`)
    })
    res.status(200).sendFile(path.join(__dirname, 'frontend/index.html'))
})
*/

app.listen(process.env.PORT || 8080, () => {
  console.info(`Running on port ${process.env.PORT || 8080}`)
})

client.on('ready', () => {
  console.log(`logged in as ${client.user.tag}`)
})

bot(client)

client.login(process.env.TOKEN)
