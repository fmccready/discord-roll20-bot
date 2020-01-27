import { UserAttributes, UserModel } from '../postgres'

export { UserAttributes as User }

export function createUser(name: string) {
  return UserModel.create({
    name: name,
  })
}

export function getUsers() {
  return UserModel.findAll()
}

export function findUserById(userId: string) {
  return UserModel.findOne({
    where: {
      id: userId,
    },
  })
}

export function findUserByName(name: string) {
  return UserModel.findAll({
    where: {
      name,
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
