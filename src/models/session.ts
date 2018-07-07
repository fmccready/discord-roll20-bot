import { Instance } from 'sequelize'
import { Observable } from 'rxjs'
import { SessionModel } from '../postgres'

export function createSession(name: string) {
  return SessionModel.create({
    name: name,
  })
}

var sessions: Array<SessionInstance> = []
export function getSessions() {
  return Observable.from(sessions)
}

export function removeSession(id: string) {}

interface SessionAttributes {
  id: string
  name: string
  date: Date
}
export type SessionInstance = Instance<SessionAttributes> & SessionAttributes
