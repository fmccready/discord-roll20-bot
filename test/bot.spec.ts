import { assert, expect } from 'chai'
import * as Discord from 'discord.js'
import fs from 'fs'
import { SinonSpy, spy } from 'sinon'

import { messageHandler } from '../src/bot'

let client: Discord.Client
// let messageHandlerSpy: SinonSpy

before('Setup discord client', function(done) {
  this.timeout(10000)
  client = new Discord.Client()
  // messageHandlerSpy = spy(messageHandler)
  // client.on('message', messageHandlerSpy)
  client.login(process.env.TOKEN).then((res) => {
    fs.writeFileSync('./data/login.json', JSON.stringify(res))
    console.log(`logged in as ${client.user.tag}`)
    done()
  })
})

describe('When a message is received', function() {
  it('Should respond to DMs', function(done) {
    // Create a DM
    console.log('client -------- ')
    console.log(Object.keys(client))
    console.log('-------------------')
    const channels = client.channels.values()
    fs.writeFileSync('./data/channels.json', JSON.stringify(channels))
    console.log(channels.next())
  })
})

after('Destroy discord client', function(done) {
  // messageHandlerSpy.restore()
  client.destroy().then(() => {
    console.log('Connection closed.')
    // messageHandlerSpy.restore()
    done()
  })
})
