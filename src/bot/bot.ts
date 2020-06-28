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

export function messageHandler(msg: Message) {
  if (msg.channel.type === 'dm') {
    const msgContent = msg.content
    const command = findCommand(msgContent)
    command ? msg.reply(command(msgContent)) : msg.reply(defaultReply())
  }
}
