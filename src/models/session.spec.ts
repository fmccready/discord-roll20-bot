import * as dotenv from 'dotenv'
import { take } from 'rxjs/operators'
dotenv.config()

import { assert } from 'chai'
import { Sequelize } from 'sequelize/types'
import { connectDatabase, disconnectDatabase } from '../postgres'
import { createSession, getSessions, removeSession } from './session'

let sequelize: Sequelize

beforeAll(async () => {
  sequelize = await connectDatabase()
})

afterAll(async () => {
  await disconnectDatabase(sequelize)
})

describe('Session', function() {
  let sessionTestData
  test('Can add a session from the database.', function(done) {
    createSession('Test').then(result => {
      sessionTestData = result
      assert(
        result.getDataValue('name') === 'Test',
        'Response should be the new session'
      )
      done()
    })
  })
  // test('can add a session to the database', function(done) {
  //   createSession('test2').then(session => {
  //     assert.propertyVal(session, 'name', 'test2')
  //     done()
  //   })
  // }, 6000)

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
