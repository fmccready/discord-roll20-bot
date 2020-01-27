import * as dotenv from 'dotenv'
import { take } from 'rxjs/operators'
dotenv.config()

import { assert } from 'chai'
import { createSession, getSessions, removeSession } from './session'

describe('Session', function() {
  let sessionTestData
  it('Can add a session from the database.', function(done) {
    createSession('Test').then(result => {
      sessionTestData = result
      assert(
        result.getDataValue('name') === 'Test',
        'Response should be the new session'
      )
      done()
    })
  })
  // it('can add a session to the database', function(done) {
  //   this.timeout(6000)
  //   createSession('test2').then(session => {
  //     assert.propertyVal(session, 'name', 'test2')
  //     done()
  //   })
  // })

  it('can retrieve sessions from the database', function(done) {
    this.timeout(6000)
    getSessions()
      .pipe(take(1))
      .subscribe({
        next: sessions => {
          assert.ok(sessions)
          assert.ok(sessions[0])
          assert.containsAllKeys(sessions[0].get(), [
            'name',
            'id',
            'createdAt',
            'updatedAt',
          ])
          done()
        },
      })
  })
  it('can remove a session from the database', done => {
    removeSession(sessionTestData).then(sessions$ => {
      sessions$.subscribe(sessions => {
        const result = sessions.find(session => {
          return session.getDataValue('id') === session.getDataValue('id')
        })
        assert.isUndefined(result)
        done()
      })
    })
  })
})
