import { getCommands, addCommands, Command } from '../src/bot/command'
import { Observable, BehaviorSubject } from 'rxjs'
import { assert } from 'chai'

describe('Discord bot', function() {
  it('It should get a list of commands', function() {
    before(function() {})

    var commands: Command[]

    getCommands().subscribe(next => (commands = next))

    assert.isArray(commands)
    assert.isNotEmpty(commands)
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
