import { Subject, Observer, Observable } from 'rxjs'
import { Instance, Op, UUID, UUIDV1, STRING } from 'sequelize'
import { sequelize, UserModel } from '../postgres'

export interface UserAttributes {
  id: string
  name: string
}
export type UserInstance = Instance<UserAttributes> & UserAttributes

export function createUser(name: string) {
  return UserModel.create({
    name: name,
  })
}

export function findUserById(userId: string) {
  return UserModel.findOne({
    where: {
      id: {
        [Op.eq]: userId,
      },
    },
  }).then((user: UserInstance) => {
    console.log(user)
  })
}

export function findUsersByGroupId(groupId: string) {
  return UserModel.findAll({
    where: {
      id: {
        [Op.eq]: groupId,
      },
    },
  }).then((users: Array<UserInstance>) => {
    users.forEach(user => {
      console.log(user)
    })
  })
}
