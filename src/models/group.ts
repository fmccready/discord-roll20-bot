import { GroupAttributes, GroupModel } from '../postgres'

function createGroup(name: string) {
  return GroupModel.create({
    name: name,
  })
}

function findGroupById(groupId: string) {
  return GroupModel.findOne({
    where: {
      id: groupId,
    },
  }).tap((group: GroupAttributes) => {
    console.log(group.name)
  })
}
