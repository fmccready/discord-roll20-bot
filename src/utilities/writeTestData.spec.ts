import { assert } from 'chai'
import { readFile } from 'fs'
import { stringify } from 'json-cycle'
import { resolve } from 'path'
import { readTestData, writeTestData } from './writeTestData'

describe('writeTestData', function() {
  const testFilename = 'writeTestData'
  // Object with a circular reference
  const testData: any = {
    a: 1,
  }
  testData.b = testData

  test('should write test data to a file', done => {
    writeTestData(testFilename, testData).subscribe(
      next => {
        readFile(
          resolve(process.cwd(), `test/data/${testFilename}.json`),
          (err, data) => {
            if (err) console.error(err)
            assert.strictEqual(data.toString(), stringify(testData))
          }
        )
      },
      err => {
        assert.fail(err)
      },
      () => done()
    )
  })
  test('should read test data', done => {
    readTestData(testFilename).subscribe(
      next => {
        assert.deepStrictEqual(next, testData)
      },
      err => {
        assert.fail(err)
      },
      () => {
        done()
      }
    )
  })
})
