import { BehaviorSubject } from 'rxjs'
import { SessionAttributes, SessionModel } from '../postgres'
import { remove } from '../utilities/remove'

const sessionSubject = new BehaviorSubject<SessionAttributes[]>([])
export function createSession(name: string) {
  return SessionModel.create({
    name: name,
  }).tap((session: SessionAttributes) => {
    const sessions = sessionSubject.getValue()
    sessions.push(session)
    sessionSubject.next(sessions)
    return session
  })
}

export function getSessions() {
  SessionModel.findAll().then(sessions => sessionSubject.next(sessions))
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
