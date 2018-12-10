import { Op } from 'sequelize'
import * as Sequelize from 'sequelize'
import { UserModel } from '../postgres'

export interface UserAttributes {
  id?: string
  name: string
}
export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes{

}

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
