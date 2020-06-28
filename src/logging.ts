import chalk, { Color } from 'chalk'
import { inspect } from 'util'

export const logSuccess = (message: string, obj?: any) => {
  log('greenBright', message, obj)
}

export const logError = (message: string, obj?: any) => {
  log('redBright', message, obj)
}

export const logWarn = (message: string, obj?: any) => {
  log('yellowBright', message, obj)
}

export const logInfo = (message: string, obj?: any) => {
  log('whiteBright', message, obj)
}

export const logVerbose = (message: string, obj?: any) => {
  log('grey', message, obj)
}

const log = (color: typeof Color, message: string, obj?: any) => {
  if (global?.test) return
  console.log(chalk`{${color} ${message}}`)
  if (obj) console.log(inspect(obj, true, null, true))
}
