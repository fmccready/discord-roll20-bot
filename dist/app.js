"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var path = require("path");
var Discord = require("discord.js");
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
app.get('/', function (req, res) {
    client.generateInvite(['SEND_MESSAGES', 'MENTION_EVERYONE']).then(function (link) {
        console.log("Bot invite link: " + link);
    });
    res.status(200).sendFile(path.join(__dirname, 'index.html'));
});
app.listen(process.env.PORT || 8080, function () {
    console.info("Running on port " + (process.env.PORT || 8080));
});
var client = new Discord.Client();
client.on('ready', function () {
    console.log("logged in as " + client.user.tag);
});
var signups = [];
client.on('message', function (msg) {
    if (msg.content.toLowerCase() === 'ping') {
        msg.reply('pong');
    }
    else if (msg.content.toLowerCase() === 'signup') {
        msg.reply('signup request received');
        signups.push(msg.author);
        msg.reply(signups.toString());
        msg.reply('signup request complete');
    }
    else if (msg.content.toLowerCase() === 'cancel') {
        msg.reply('cancel request received');
        signups.splice(signups.indexOf(msg.author), 1);
        msg.reply(signups.toString());
        msg.reply('cancel request complete');
    }
});
client.login(process.env.TOKEN);
//# sourceMappingURL=app.js.map