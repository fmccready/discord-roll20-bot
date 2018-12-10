import * as Sequelize from 'sequelize'
import { BehaviorSubject } from 'rxjs'
import { SessionModel } from '../postgres'
import { remove } from '../utilities/remove'

var sessionSubject = new BehaviorSubject<Array<SessionInstance>>([])

export function createSession(name: string) {
  var session = SessionModel.create({
    name: name,
  }).tap(session => {
    const sessions = sessionSubject.getValue()
    sessions.push(session)
    sessionSubject.next(sessions)
  })

  return session
}

export function getSessions() {
  return sessionSubject
}

export function removeSession(sessionInstance: SessionInstance) {
  return sessionInstance.destroy().then(() => {
      sessionSubject.next(remove(sessionSubject.getValue(), sessionInstance))
    return getSessions()
  })
}


export interface SessionAttributes {
  id?: number
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export interface SessionInstance extends Sequelize.Instance<SessionAttributes>, SessionAttributes{

}