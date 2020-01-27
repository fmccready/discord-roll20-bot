import { assert, expect } from 'chai'
import * as fs from 'fs'
import { login, logout } from '../../test/discord-login'
import { removeById } from './remove'
import writeJSON from './writeJSON'

describe('writeJSON', function() {
  let client
  before(() => (client = login()))

  it('Should filter an object from an array by its `id` property and return a new array', () => {
    const arr = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }]
    const result = removeById(arr, { id: '3' })
    assert.deepEqual(result, [{ id: '1' }, { id: '2' }, { id: '4' }])
    assert(result !== arr, 'result should not refer to the given array')
  })
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
        throw err
      }
      done()
    })
    writeJSON(channelStream, channels)
  })
  after(logout)
})
