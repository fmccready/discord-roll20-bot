import * as bodyParser from 'body-parser'
import * as Discord from 'discord.js'
import * as dotenv from 'dotenv'
import * as express from 'express'
import bot from './bot'
import './bot/command'
import './postgres'

dotenv.config()

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
