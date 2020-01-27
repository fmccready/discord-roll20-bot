import { BehaviorSubject, from } from 'rxjs'
import { SessionAttributes, SessionModel } from '../postgres'
import { removeById } from '../utilities/remove'

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
  return from(sessionSubject)
}

export function removeSession(sessionInstance: SessionAttributes) {
  return sessionInstance.destroy().then(() => {
    sessionSubject.next(removeById(sessionSubject.getValue(), sessionInstance))
    return from(sessionSubject)
  })
}
