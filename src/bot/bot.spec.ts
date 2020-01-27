import { assert, expect } from 'chai'
import { Message } from 'discord.js'
import * as sinon from 'sinon'
import { messageHandler } from './index'
import { login, logout } from '../../test/discord-login'

describe('When a message is received', function() {
  it.skip('Should respond to DMs', function() {
    const msg = {
      channel: {
        type: 'dm',
      },
      content: 'Hello!',
      reply: sinon.spy() as Message['reply'],
    }

    messageHandler(msg as Message)
    const testReply = msg.reply as sinon.SinonSpy
    assert(testReply.calledOnce)
  })
})
