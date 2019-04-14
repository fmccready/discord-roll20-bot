import { assert, expect } from 'chai'
import * as fs from 'fs'
import writeJSON from '../src/utilities/writeJSON'
import { login, logout } from './fixtures/discord-login'

const client = login()

describe('writeJSON', function() {
  it('Should produce valid JSON', function(done) {
    const channelsFilePath = 'test/data/channels.json'
    const channels = client.channels.values()

    const channelStream = fs.createWriteStream(channelsFilePath)

    channelStream.on('close', () => {
      const data = fs.readFileSync(channelsFilePath)
      try {
        assert.isOk(JSON.parse(data.toString()))
      } catch (err) {
        assert.fail('does not produce valid json')
        throw(err)
      }
      done()
    })
    writeJSON(channelStream, channels)
  })
})

logout()
