import { find, tap, propEq, defaultTo } from 'ramda'
import { Client } from 'discord.js'
import { Command, getCommands } from './command'

var commandList: Array<Command> = []

getCommands().subscribe(commands => {
  commandList = commands
})

function defaultReply() {
  let reply = `Next game is at .\n`
  reply += commandList
    .map(command => {
      return command.instruction
    })
    .join('\n')
  return reply
}

export function findCommand(command: string, argument?: any): () => string {
  var nameEqualsCommand = propEq('name', command)
  var foundCommandInList = find(nameEqualsCommand, commandList)
  if (foundCommandInList) {
    return foundCommandInList.action
  } else {
    return defaultReply
  }
}

export default function init(client: Client) {
  client.on('message', msg => {
    let msgContent = msg.content.toLowerCase()
    console.log('findCommand(msgContent)', findCommand(msgContent))
    msg.reply(findCommand(msgContent))
  })
}

function codeMarkdown(reply) {
  return `\`${reply}\``
}
