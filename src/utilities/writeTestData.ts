import { mkdir as mkdirFs } from 'fs'
import { readFile as readFileFs, writeFile as writeFileFs } from 'fs'
import { parse, stringify } from 'json-cycle'
import { resolve } from 'path'
import { concat, from, onErrorResumeNext } from 'rxjs'
import { promisify } from 'util'

const writefile = promisify(writeFileFs)
const mkdir = promisify(mkdirFs)
const readFile = promisify(readFileFs)

const matchSpecialCharacters = /[^a-zA-Z0-9-_.]/

const getFile = (filename: string) =>
  `test/data/${filename.replace(matchSpecialCharacters, '')}.json`

export function readTestData(testFilename: string) {
  const readTestFile = from(
    readFile(getFile(testFilename)).then(fileData => parse(fileData))
  )

  return readTestFile
}

export function writeTestData(testFilename: string, testData: object) {
  const makeTestDataDirectory = onErrorResumeNext(
    from(
      mkdir(resolve(process.cwd(), 'test/data')).catch(err => {
        if (err.code !== 'EEXIST') console.error(err)
      })
    )
  )
  const writeTestFile = from(
    writefile(
      resolve(process.cwd(), getFile(testFilename)),
      stringify(testData)
    )
  )

  return concat(makeTestDataDirectory, writeTestFile)
}
