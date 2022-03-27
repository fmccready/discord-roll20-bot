import { setupServer } from 'msw/node'
import { handlers } from './message-form-handler'

export const server = setupServer(...handlers)
