import { Observable, BehaviorSubject } from 'rxjs'
import { union } from 'ramda'
import { getSessions } from '../models/session'
import { remove } from '../utilities'
//import { createSession, removeSession } from '../models/session'

export interface Command {
  name: string
  instruction: string
  action: Function
}

// var sessions: Array<SessionInstance>

// getSessions().subscribe({
//   next: value => {
//     sessions = value
//   },
// })

const commands$ = new BehaviorSubject(commands)

export function getCommands() {
  return commands$.asObservable()
}

var commands: Array<Command> = [
  {
    name: 'sessions',
    instruction: 'Say "sessions" to see the available sessions.',
    action: function(msg) {
      var response = ''
      getSessions().subscribe(sessions => {
        sessions.forEach(function(session) {
          response.concat(`${session} \n`)
        })
      })

      return response
    },
  },
  /*
  {
    name: 'signup',
    instruction: 'Say "signup" to RSVP to the session.',
    action: function(msg) {
      user.push(msg.author)
      return user.toString()
    },
  },
  {
    name: 'cancel',
    instruction: 'Say "cancel" to remove yourself from the game.',
    action: function(msg) {
      signups.splice(signups.indexOf(msg.author), 1)
      return signups.toString()
    },
  },
  {
    name: 'users',
    instruction: 'Say "users" to see a list of users.',
    action: function(msg) {
      return users.toString()
    },
  },
  */
  {
    name: 'ping',
    instruction: `Say "ping" and I'll say "pong"`,
    action: function() {
      return 'pong'
    },
  },
  /*
  {
    name: 'create session',
    instruction: `Say "Create Session" to make a new session.`,
    action: createSession,
  },
  {
    name: 'remove session',
    instruction: `Say "Remove Session" to remove a session`,
    action: removeSession,
  },
  */
]

commands$.next(commands)

export function addCommands(newCommands: Command[]) {
  commands$.next(union(commands$.getValue(), newCommands))
}
