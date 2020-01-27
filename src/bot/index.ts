import { Client, Message } from 'discord.js'
import { defaultTo, find, propEq, tap } from 'ramda'
import { Command, getCommands } from './command'
import writeTestData from '../utilities/writeTestData'

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
  if (foundCommandInList) return foundCommandInList.action
}

export function messageHandler(msg: Message) {
  if (msg.channel.type === 'dm') {
    const msgContent = msg.content
    const command = findCommand(msgContent)
    if (command) {
      console.log(command(msgContent))
      msg.reply(command(msgContent))
    }
  }
}

function codeMarkdown(reply) {
  return `\`${reply}\``
}
