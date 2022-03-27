import { Message } from 'discord.js'
import { logInfo } from '../logging'
import { Commands, getCommands } from './command'

let commandList: Commands

getCommands().subscribe(commands => {
  commandList = commands
})

function defaultReply() {
  return `List of commands
  ${Object.keys(commandList)
    .map(key => commandList[key].instruction)
    .join('\n')}`
}

export function findCommand(command: string): (msg?: any) => string {
  logInfo(`Command: ${command}`, commandList)
  const foundCommandInList = commandList[command]

  if (foundCommandInList) return foundCommandInList.action
}

export function messageHandler(message: Message) {
  if (message.channel.type === 'dm') {
    const messageContent = message.content
    const command = findCommand(messageContent)
    command
      ? message.reply(command(messageContent))
      : message.reply(defaultReply())
  }
}
