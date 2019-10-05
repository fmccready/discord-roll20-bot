import { UserAttributes, UserModel } from '../postgres'

export function createUser(name: string) {
  return UserModel.create({
    name: name,
  })
}

export function findUserById(userId: string) {
  return UserModel.findOne({
    where: {
      id: userId,
    },
  })
}

export function findUsersByGroupId(groupId: string) {
  return UserModel.findAll({
    where: {
      id: groupId,
    },
  }).then((users: UserAttributes[]) => {
    users.forEach(user => {
      console.log(user.name)
    })
  })
}
