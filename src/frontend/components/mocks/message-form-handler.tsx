// src/mocks/handlers.js

import { rest } from 'msw'

export const handlers = [
  rest.post('/message', (request, response, context) =>
    response(context.json({ responses: ['pong'] }))
  ),
]
