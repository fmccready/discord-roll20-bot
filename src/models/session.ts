import { BehaviorSubject } from 'rxjs'
import * as Sequelize from 'sequelize'
import { SessionModel } from '../postgres'
import { remove } from '../utilities/remove'

const sessionSubject = new BehaviorSubject<SessionInstance[]>([])

export function createSession(name: string) {
  return SessionModel.create({
    name: name,
  }).tap((session) => {
    const sessions = sessionSubject.getValue()
    sessions.push(session)
    sessionSubject.next(sessions)
  })
}

export function getSessions() {
  return sessionSubject
}
/*
export function removeSession(sessionInstance: SessionInstance) {
  return sessionInstance.destroy().then(() => {
      sessionSubject.next(remove(sessionSubject.getValue(), sessionInstance))
      return getSessions()
  })
}
*/
export interface SessionAttributes {
  id?: number
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export interface SessionInstance extends Sequelize.Instance<SessionAttributes>, SessionAttributes {

}
