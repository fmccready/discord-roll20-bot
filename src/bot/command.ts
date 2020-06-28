import { BehaviorSubject } from 'rxjs'

export interface Commands {
  [key: string]: {
    name: string
    instruction: string
    action: (...T) => string
  }
}

const commands: Commands = {
  ping: {
    action: function() {
      return 'pong'
    },
    instruction: `Say "ping" and I'll say "pong"`,
    name: 'ping',
  },
}

const commands$ = new BehaviorSubject(commands)

export function getCommands() {
  return commands$.asObservable()
}

commands$.next(commands)

export function addCommands(newCommands: Commands) {
  commands$.next({ ...commands$.getValue(), ...newCommands })
}
