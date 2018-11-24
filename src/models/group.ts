import { Instance, Op } from 'sequelize'
import { GroupModel } from '../postgres'

interface GroupAttributes {
  id: string
  name: string
}
type GroupInstance = Instance<GroupAttributes> & GroupAttributes

function createGroup(name: string) {
  return GroupModel.create({
    name: name,
  })
}

function findGroupById(groupId: string) {
  return GroupModel.find({
    where: {
      id: {
        [Op.eq]: groupId,
      },
    },
  }).then((group: GroupInstance) => {
    console.log(group)
  })
}
