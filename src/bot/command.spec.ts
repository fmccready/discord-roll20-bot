import * as dotenv from 'dotenv'
dotenv.config()
import { assert } from 'chai'
import { Subscription } from 'rxjs'
import { findCommand } from './bot'
import { addCommands, Commands, getCommands } from './command'

let commands: Commands
let commandSubscription: Subscription
describe('Commands', function() {
  beforeAll(function() {
    commandSubscription = getCommands().subscribe(next => (commands = next))
  })

  test('Has a list of commands', function() {
    assert.isObject(commands)
    assert.isNotEmpty(commands)
  })

  test('Finds a command', function() {
    const ping = findCommand('ping')
    assert.equal(ping(), 'pong')
  })

  test('Allows you to add commands', function() {
    const testCommands = {
      test1: {
        action: function(msg, user) {
          return 'zomg it works!'
        },
        instruction: 'Say "test1" to test.',
        name: 'test1',
      },
      test2: {
        action: function(msg, user) {
          return 'zomg it works again!'
        },
        instruction: 'Say "test2" to test again.',
        name: 'test2',
      },
    }
    addCommands(testCommands)
    assert.equal(findCommand('test1')(), 'zomg it works!')
    assert.equal(findCommand('test2')(), 'zomg it works again!')
  })

  afterAll(function() {
    commandSubscription.unsubscribe()
  })
})
