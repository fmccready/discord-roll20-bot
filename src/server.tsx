import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import Discord from 'discord.js'
import express from 'express'
import { Response } from 'express'
import { logSuccess, logError, logInfo, logVerbose } from './logging'
import path from 'path'
import pug from 'pug'
import React, { ReactComponentElement } from 'react'
import ReactDOMServer from 'react-dom/server'
import { Readable } from 'stream'
import { messageHandler } from './bot/bot'
import './bot/command'
import App from './frontend/App'
import './postgres'

export const app = express()

app.set('views', path.join(__dirname, 'frontend/views'))
app.set('view engine', 'pug')

const client = new Discord.Client()

logVerbose(`Template path: ${path.join(__dirname, 'frontend/views')}`)

const indexTemplate = pug.compileFile(
  path.join(__dirname, 'frontend/views/index.pug')
)

const respondWithComponent = (
  res: Response<any>,
  Component: React.FunctionComponent<any>,
  data: any
) => {
  console.log(data)
  const [head, footer] = indexTemplate()
    .split('ServerRenderContent')
    .map(it => Readable.from(it))
  const body = ReactDOMServer.renderToNodeStream(<Component {...data} />)

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
  console.log('MESSAGE RECEIVED')
  console.log(req.body.message)
  console.log(typeof req.body.message)
  const requestBody = req.body
  logInfo('POST: /message', requestBody)

  if (!requestBody) {
    res.status(400).send('Request cannot be empty')
  }

  const message = {
    channel: { type: requestBody.type },
    content: requestBody.message,
    reply: response => {
      console.log('RESPONSE!!!!!!!!!!!')
      console.log(response)

      res.status(200)
      res.send({ responses: [response] })
    },
  } as any

  messageHandler(message)
})

app.get('/', (req, res) => {
  client.generateInvite(['SEND_MESSAGES', 'MENTION_EVERYONE']).then(link => {
    logInfo(`Bot invite link: ${link}`)

    respondWithComponent(res, App, { responses: [] })
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
