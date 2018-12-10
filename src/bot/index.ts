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

export function findCommand(command: string): (msg?: any) => string {
  var nameEqualsCommand = propEq('name', command.toLowerCase())
  var foundCommandInList = find(nameEqualsCommand, commandList)
  if (foundCommandInList) {
    return foundCommandInList.action
  } else {
    return defaultReply
  }
}

export default function init(client: Client) {
  client.on('message', msg => {
    const msgContent = msg.content
    const command = findCommand(msgContent)
    msg.reply({ response: command(msgContent) })
  })
}

function codeMarkdown(reply) {
  return `\`${reply}\``
}
