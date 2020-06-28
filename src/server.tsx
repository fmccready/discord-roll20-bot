import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import chalk from 'chalk'
import Discord from 'discord.js'
import express from 'express'
import { Response } from 'express'
import { logSuccess, logError, logInfo, logVerbose } from './logging'
import path from 'path'
import pug from 'pug'
import React, { ReactComponentElement } from 'react'
import ReactDOMServer from 'react-dom/server'
import { Readable } from 'stream'
import { inspect } from 'util'
import { messageHandler } from './bot/bot'
import './bot/command'
import { MessageForm } from './frontend/components/message-form'
import './postgres'

export const app = express()

app.set('views', path.join(__dirname, 'frontend/views'))
app.set('view engine', 'pug')

const client = new Discord.Client()

logVerbose(`Template path: ${path.join(__dirname, 'frontend/views')}`)

const indexTemplate = pug.compileFile(
  path.join(__dirname, 'frontend/views/index.pug')
)

const respondWithComponent = (res: Response<any>, Component) => {
  const [head, footer] = indexTemplate()
    .split('ServerRenderContent')
    .map(it => Readable.from(it))
  const body = ReactDOMServer.renderToNodeStream(<Component />)

  res.status(200)

  head.pipe(
    res,
    { end: false }
  )
  body.pipe(
    res,
    { end: false }
  )
  footer.pipe(res)
}

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.use(express.static('dist/frontend'))

app.post('/message', function(req, res) {
  const requestBody = req.body
  logInfo('POST: /message', requestBody)

  if (!requestBody) {
    res.status(400).send('Request cannot be empty')
  }

  messageHandler({
    channel: { type: requestBody.type },
    content: requestBody.message,
    reply: response => {
      res.send(response)
    },
  } as any)
})

app.get('/', (req, res) => {
  client.generateInvite(['SEND_MESSAGES', 'MENTION_EVERYONE']).then(link => {
    logInfo(`Bot invite link: ${link}`)

    respondWithComponent(res, MessageForm)
  })
})

app.get('/message', (req, res) => {
  res.status(200).render('index')
})

app.get('/invite', (req, res) => {
  client.generateInvite(['SEND_MESSAGES', 'MENTION_EVERYONE']).then(link => {
    res.status(200).send(link)
  })
})

app.listen(process.env.PORT || 8080, () => {
  logSuccess(`Running on port ${process.env.PORT || 8080}`)
})

client.on('ready', () => {
  logSuccess(`logged in as ${client.user.tag}`)
})

client.on('message', messageHandler)
client.login(process.env.TOKEN)
