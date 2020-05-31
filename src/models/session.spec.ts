import * as dotenv from 'dotenv'
import { take } from 'rxjs/operators'
dotenv.config()

import { assert } from 'chai'
import { SessionAttributes } from '../postgres'
import { createSession, getSessions, removeSession } from './session'

describe('Session', function() {
  let sessionTestData: SessionAttributes
  test.only('Can add a session from the database.', async () => {
    sessionTestData = await createSession('Test')
    assert(
      sessionTestData.getDataValue('name') === 'Test',
      'Response should be the new session'
    )
  })

  test(
    'can retrieve sessions from the database',
    function(done) {
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
    },
    6000
  )
  test('can remove a session from the database', done => {
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
