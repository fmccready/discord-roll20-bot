import { Client } from 'discord.js'

const client = new Client()

let loggedIn

export const login = function() {
  if (!loggedIn) {
    loggedIn = true
    beforeAll(function(done) {
      client.login(process.env.TOKEN).then(() => {
        console.log(`logged in as ${client.user.tag}`)
        done()
      })
    }, 10000)
  }

  return client
}

export const logout = function() {
  if (!client) return
  afterAll(function(done) {
    client.destroy().then(done)
  })
}
