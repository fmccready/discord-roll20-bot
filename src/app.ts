import * as express from 'express'
import * as path from 'path'
import * as Discord from 'discord.js'
import bot from './bot'

const app = express()
const client = new Discord.Client()

app.get('/', (req, res) => {
    client.generateInvite(['SEND_MESSAGES', 'MENTION_EVERYONE']).then(link => {
        console.log(`Bot invite link: ${link}`)
    })
    res.status(200).sendFile(path.join(__dirname, 'index.html'))
})

app.listen(process.env.PORT || 8080, () => {
    console.info(`Running on port ${process.env.PORT || 8080}`)
})

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`)
})

bot(client)

client.login(process.env.TOKEN)
