import { Client, Message } from 'discord.js'
import { defaultTo, find, propEq, tap } from 'ramda'
import { writeTestData } from '../utilities/writeTestData'
import { Command, getCommands } from './command'

let commandList: Command[] = []

getCommands().subscribe(commands => {
  commandList = commands
})

function defaultReply() {
  return `List of commands
  ${commandList.map(command => command.instruction).join('\n')}`
}

export function findCommand(command: string): (msg?: any) => string {
  const nameEqualsCommand = propEq('name', command.toLowerCase())
  const foundCommandInList = find(nameEqualsCommand, commandList)
  if (foundCommandInList) return foundCommandInList.action
}

export function messageHandler(msg: Message) {
  if (msg.channel.type === 'dm') {
    const msgContent = msg.content
    const command = findCommand(msgContent)
    if (command) {
      msg.reply(command(msgContent))
    } else {
      msg.reply(defaultReply())
    }
  }
}

function codeMarkdown(reply) {
  return `\`${reply}\``
}
