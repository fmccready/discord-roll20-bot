import { Command } from 'Bot/commands'
import { getCommands } from 'Bot/commands/standard'
import { Game } from 'Bot/games'
import getGames from 'Bot/games/roll20'

var commandList = []
var games = []
getCommands().subscribe((command) => {
    commandList.push(command)
})
getGames().subscribe((game)=>{
    games.push(game)
})


export default function init(client): void{
    client.on('message', msg => {
        let msgContent = msg.content.toLowerCase()
        let commands = commandList.filter((command) => {
            if (command.name === msgContent){
                return command
            }
        })

        if (commands.length > 0){
            commands.forEach((command) => {
                command.action(msg)
            })
        } else {
            msg.reply(`Next game is at ${games[0].time}. Say "signup" to RSVP to the game. Say "cancel" to remove yourself. Say "players" to see who is playing.`)
        }
    })
}

