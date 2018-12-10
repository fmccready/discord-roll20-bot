const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: path.join(__dirname, '../.env') })

import { assert } from 'chai'
import { sequelize } from '../src/postgres'
import { getCommands, addCommands, Command } from '../src/bot/command'
import { findCommand } from '../src/bot'
import {
  createSession,
  removeSession,
  getSessions,
} from '../src/models/session'
import {
  createUser,
  findUserById,
  findUsersByGroupId,
} from '../src/models/user'

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
      assert(data.getDataValue('name') === 'Test')
      removeSession(data).then(() => {
        done()
      })
    })
  })

  it('Can get a list of available sessions from the database.', function(done) {
    this.timeout(6000)
    getSessions().subscribe(nextSessions => {
      nextSessions.map(function(session){
        if(session.name === 'test2') {
          assert(true)
          done()  
        }
      })
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

  it('Can create new users', function() {
    createUser('test-user').then(function(user){
      assert(user.name === 'test-user')
    })
  })

  after(function() {
    sequelize.close()
  })
})