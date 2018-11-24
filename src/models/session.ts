import { Instance, Op, Model } from 'sequelize'
import { from, Subject } from 'rxjs'
import { SessionModel } from '../postgres'
import { remove } from '../utilities/remove'

var sessions: Array<SessionInstance> = []
var sessionSubject = Subject.create(sessions)
sessionSubject.next(sessions)

export function createSession(name: string) {
  var session = SessionModel.create({
    name: name,
    date: Date.now(),
  }).tap(data => {
    sessions.push(data)
    sessionSubject.next(sessions)
  })

  return session
}

export function getSessions() {
  return sessionSubject
}

export function removeSession(sessionInstance: SessionInstance) {
  return sessionInstance.destroy().then(() => {
    sessionSubject.next(remove(sessions, sessionInstance))
    return getSessions()
  })
  /*
  console.log(sessionInstance.id)
  return Model.destroy({
    where: { id: { [Op.eq]: sessionInstance.id } },
  })
    .then(() => {
      console.log('does it make it here?')
      remove(sessions, sessionInstance)
    })
    .catch(err => {
      console.log(
        'There was an error deleting the record from the database:',
        err
      )
    })
    */
}

interface SessionAttributes {
  id: string
  name: string
  date: Date
}
export type SessionInstance = Instance<SessionAttributes> & SessionAttributes
