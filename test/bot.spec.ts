import { assert, expect } from 'chai'
import { login, logout } from './fixtures/discord-login'
import {} '../src/bot/index'

const client = login()

describe('When a message is received', function() {
  it.skip('Should respond to DMs', function(done) {
    // Create a DM

    done()
  })
})

logout()
