const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: path.join(__dirname, '../.env') })

import { assert } from 'chai'
import { Observable, BehaviorSubject } from 'rxjs'
import { sequelize } from '../src/postgres'
import { getCommands, addCommands, Command } from '../src/bot/command'
import { findCommand } from '../src/bot'
import { SessionInstance } from '../src/models/session'
import {
  createSession,
  removeSession,
  getSessions,
} from '../src/models/session'

sequelize.logging = () => {}

var commands: Command[]

describe('Discord bot', function() {
  before(function() {
    getCommands().subscribe(next => (commands = next))
  })

  it('Has a list of commands', function() {
    assert.isArray(commands)
    assert.isNotEmpty(commands)
  })

  it('Finds a command in an array', function() {
    var ping = findCommand('ping')
    assert.equal(ping(), 'pong')
  })

  it('Can add and remove a session from the database.', function(done) {
    createSession('Test').then(data => {
      assert.nestedPropertyVal(data, 'dataValues.name', 'Test')
      removeSession(data).then(() => {
        done()
      })
    })
  })

  it('Can get a list of available sessions from the database.', function(done) {
    getSessions().subscribe({
      next: nextSessions => {
        assert(nextSessions[0].dataValues.name === 'test2')
        done()
      },
    })
    createSession('test2')
  })

  it('Allows you to add commands', function() {
    var testCommands = [
      {
        name: 'test1',
        instruction: 'Say "test1" to test.',
        action: function(msg, user) {
          return 'zomg it works!'
        },
      },
      {
        name: 'test2',
        instruction: 'Say "test2" to test again.',
        action: function(msg, user) {
          return 'zomg it works again!'
        },
      },
    ]
    addCommands(testCommands)
    assert.equal(findCommand('test1')(), 'zomg it works!')
    assert.equal(findCommand('test2')(), 'zomg it works again!')
  })

  after(function() {
    sequelize.close()
  })
})
/*
  it('Should get the list of commands and return the ping command', function() {
    assert.sameMembers
    assert.equal(commands['ping'].action(), 'pong')
  })

  var testCommand1 = [
    {
      name: 'test1',
      instruction: 'Say "test" to test.',
      action: function(msg, user) {
        return 'zomg it works!'
      },
    },
    {
      name: 'test2',
      instruction: 'Say "test" to test.',
      action: function(msg, user) {
        return 'zomg it works!'
      },
    },
  ]
  var testCommand2 = [
    {
      name: 'test2',
      instruction: 'Say "test2" to test.',
      action: function(msg, user) {
        return 'zomg it works2222!'
      },
    },
    {
      name: 'test3',
      instruction: 'Say "test3" to test.',
      action: function(msg, user) {
        return 'zomg it works33333!'
      },
    },
  ]
})
*/
