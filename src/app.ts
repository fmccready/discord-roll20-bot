import * as express from 'express'

var app = express()
import * as path from 'path'
import * as Discord from 'discord.js'
/*
const jwt = require('express-jwt')
const fs = require('fs')
const cookieParser = require('cookie-parser')


app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.info('Running on port 80');
});

app.use('/api/discord', require('./api/discord'));

app.use((err, req, res, next) => {
    switch (err.message) {
        case 'NoCodeProvided':
            return res.status(400).send({
                status: 'ERROR',
                error: err.message,
            });
        default:
            return res.status(500).send({
                status: 'ERROR',
                error: err.message,
            });
    }
});
*/
app.get('/', (req, res) => {
    client.generateInvite(['SEND_MESSAGES', 'MENTION_EVERYONE']).then(link => {
        console.log(`Bot invite link: ${link}`)
    })
    res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.info(`Running on port ${process.env.PORT || 8080}`);
});

const client = new Discord.Client()

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`)
})
var signups = [];

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong')
    } else if (msg.content.toLowerCase() === 'signup') {
        signups.push(msg.author)
    } else if (msg.content.toLowerCase() === 'cancel') {
        signups.splice(signups.indexOf(msg.author), 1)
    }
})

client.login(process.env.TOKEN)
