import * as dotenv from 'dotenv'
dotenv.config()

import { assert } from 'chai'
import { Sequelize } from 'sequelize/types'
import { connectDatabase, disconnectDatabase } from '../postgres'
import { createUser, findUserByName } from './user'

let sequelize: Sequelize

beforeAll(async () => {
  sequelize = await connectDatabase()
})

afterAll(async () => {
  await disconnectDatabase(sequelize)
})

describe.skip('Users', function() {
  const USERNAME = 'test-user'
  test('Can create and remove users', function() {
    createUser(USERNAME).then(function(user) {
      assert(user.name === USERNAME)
    })
  })

  it.skip('Can find a user by name', function() {
    findUserByName(USERNAME).then(users => {
      const testuser = users.find(user => user.name === USERNAME)
      assert(testuser.name === USERNAME)
    })
  })
})
