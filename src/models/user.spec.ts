import * as dotenv from 'dotenv'
dotenv.config()
import { Subscription } from 'rxjs'

import { assert, expect } from 'chai'
import {
  createUser,
  findUserById,
  findUsersByGroupId,
  User,
  findUserByName,
} from './user'

describe.skip('Users', function() {
  const USERNAME = 'test-user'
  it('Can create and remove users', function() {
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
