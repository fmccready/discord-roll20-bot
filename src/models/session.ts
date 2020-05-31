import { BehaviorSubject, from } from 'rxjs'
import { SessionAttributes, SessionModel } from '../postgres'
import { removeById } from '../utilities/remove'

const sessionSubject = new BehaviorSubject<SessionAttributes[]>([])
export async function createSession(name: string) {
  const session = await SessionModel.create({ name })
  const sessions = sessionSubject.getValue()
  sessions.push(session)
  sessionSubject.next(sessions)
  return session
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
