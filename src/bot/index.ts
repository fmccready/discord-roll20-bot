import { Client } from 'discord.js'
import { defaultTo, find, propEq, tap } from 'ramda'
import { Command, getCommands } from './command'

let commandList: Command[] = []

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
  const nameEqualsCommand = propEq('name', command.toLowerCase())
  const foundCommandInList = find(nameEqualsCommand, commandList)
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
    console.log(command(msgContent))
    msg.reply({ response: command(msgContent) })
  })
}

function codeMarkdown(reply) {
  return `\`${reply}\``
}
