import * as dotenv from 'dotenv'
dotenv.config()

import { assert } from 'chai'
import {
  createSession,
  getSessions,
  //  removeSession,
} from '../src/models/session'

describe('Session', function() {
  /*
  it('Can add and remove a session from the database.', function(done) {
    createSession('Test').then((data) => {
      assert(data.getDataValue('name') === 'Test')
      removeSession(data).then(() => {
        done()
      })
    })
  })
*/
  it('can add a session to the database', function(done) {
    this.timeout(6000)
    createSession('test2').then(session => {
      assert.propertyVal(session, 'name', 'test2')
      done()
    })
  })

  it('can retrieve sessions from the database', function(done) {
    this.timeout(6000)
    getSessions().subscribe({
      next: sessions => {
        assert.ok(sessions)
        assert.ok(sessions[0])
        assert.containsAllKeys(sessions, [
          'name',
          'id',
          'createdAt',
          'updatedAt',
        ])
        done()
      },
    })
  })
})
