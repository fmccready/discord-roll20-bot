var app = require('express')()
const path = require('path')
const env = require('./env')
const Discord = require('discord.js')
const jwt = require('express-jwt')

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(50451, () => {
    console.info('Running on port 50451');
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



/*
app.use('/api/discord', require('./api/discord'))

const client = new Discord.Client()

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`)
})

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong')
    }
})

client.login(env.token)
*/