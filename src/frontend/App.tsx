import * as React from 'react'

import MessageForm from './components/message-form'
import { ResponseProvider } from './components/response-provider'
import Responses from './components/responses'

const App = () => (
  <ResponseProvider>
    <section id="app">
      <h1>🤖 bot test 🤖</h1>
      <MessageForm />
      <Responses />
    </section>
  </ResponseProvider>
)

export default App
