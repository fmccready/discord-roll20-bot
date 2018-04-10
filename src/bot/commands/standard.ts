import { addCommand, getCommands } from './index'
import roll20Games from 'Bot/games/roll20'
import { createGroup } from 'Bot/group'

var testGroup = createGroup()
var games = []
var games$ = roll20Games().subscribe({
    next: function(nextGames){
        games = nextGames
    }
})
var testGame = games[0]
testGame.group = testGroup

var actions = [
    {
        name: 'signup', 
        instruction: 'Say "signup" to RSVP to the game.',
        action: function(msg, signups){
            signups.push(msg.author)
            msg.reply(signups.toString())
        }
    },
    {
        name: 'cancel',
        instruction: 'Say cancel to remove yourself from the game.',
        action: function(msg, signups){
            signups.splice(signups.indexOf(msg.author), 1)
            msg.reply(signups.toString())
        }
    },
    {
        name: 'players',
        instruction: 'Say "players" to see who is playing.',
        action: function(msg, signups){
            msg.reply(signups.toString())
        }
    },
    {
        name: 'ping',
        instruction: `Say "ping" and I'll say "pong"`,
        action: function(msg){
            msg.reply('pong')
        }
    }
]

actions.forEach(addCommand)

export { getCommands }