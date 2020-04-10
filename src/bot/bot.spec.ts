import { equal, ok } from 'assert'
import { Message, SnowflakeUtil } from 'discord.js'
import { assert, SinonSpy, spy } from 'sinon'
import { getCommands } from './command'
import { messageHandler } from './index'

describe('When a message is received', function() {
  test('Should respond to DMs', function() {
    const msg = {
      channel: {
        type: 'dm',
      },
      content: 'ping',
      id: SnowflakeUtil.generate(),
      reply: spy() as Message['reply'],
    }

    messageHandler(msg as Message)
    const testReply = msg.reply as SinonSpy
    ok(testReply.calledOnce)
  })
  test('Should not reply to messages that are not dm', function() {
    const msg = {
      channel: {
        type: 'text',
      },
      content: 'ping',
      id: SnowflakeUtil.generate(),
      reply: spy() as Message['reply'],
    }

    messageHandler(msg as Message)
    const testReply = msg.reply as SinonSpy
    ok(testReply.notCalled)
  })
  test('If the message is a dm but the command is not found then it should respond with a list of commands', function() {
    const msg = {
      channel: {
        type: 'dm',
      },
      content: 'an unknown command!',
      id: SnowflakeUtil.generate(),
      reply: spy() as Message['reply'],
    }

    messageHandler(msg as Message)
    const testReply = msg.reply as SinonSpy
    assert.calledWithMatch(testReply, /List of commands*/)
  })

  test('It can get a list of available commands', async function() {
    await getCommands().subscribe(val => {
      equal(val.filter(command => command.name === 'ping').length, 1)
    })
  })
})
