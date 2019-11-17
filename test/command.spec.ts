import * as dotenv from 'dotenv'
dotenv.config()
import { Subscription } from 'rxjs'

import { assert } from 'chai'
import { findCommand } from '../src/bot'
import { addCommands, Command, getCommands } from '../src/bot/command'
import {
  createUser,
  findUserById,
  findUsersByGroupId,
} from '../src/models/user'
import { sequelize } from '../src/postgres'

let commands: Command[]
let commandSubscription: Subscription
describe('Discord bot', function() {
  before(function() {
    commandSubscription = getCommands().subscribe(next => (commands = next))
  })

  it('Has a list of commands', function() {
    assert.isArray(commands)
    assert.isNotEmpty(commands)
  })

  it('Finds a command in an array', function() {
    const ping = findCommand('ping')
    assert.equal(ping(), 'pong')
  })

  it('Allows you to add commands', function() {
    const testCommands = [
      {
        action: function(msg, user) {
          return 'zomg it works!'
        },
        instruction: 'Say "test1" to test.',
        name: 'test1',
      },
      {
        action: function(msg, user) {
          return 'zomg it works again!'
        },
        instruction: 'Say "test2" to test again.',
        name: 'test2',
      },
    ]
    addCommands(testCommands)
    assert.equal(findCommand('test1')(), 'zomg it works!')
    assert.equal(findCommand('test2')(), 'zomg it works again!')
  })

  it('Can create new users', function() {
    createUser('test-user').then(function(user) {
      assert(user.name === 'test-user')
    })
  })

  after(function() {
    commandSubscription.unsubscribe()
  })
})
