import { Client } from 'discord.js'

const client = new Client()

let loggedIn

const login = function() {
  if (!loggedIn) {
    loggedIn = true
    before('Setup discord client', function(done) {
      this.timeout(10000)
      client.login(process.env.TOKEN).then(() => {
        console.log(`logged in as ${client.user.tag}`)
        done()
      })
    })
  }

  return client
}

const logout = function() {
  if (!client) return
  after('Destroy discord client', function(done) {
    client.destroy().then(done)
  })
}

export { login, logout }
