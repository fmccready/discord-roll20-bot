import React from 'react'
import ReactDOM from 'react-dom'

import { MessageForm } from './components/message-form'

ReactDOM.hydrate(<MessageForm />, document.getElementById('app'))
