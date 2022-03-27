import * as React from 'react'
import { useResponse } from './response-provider'

const Responses = () => {
  const { responses } = useResponse()

  return (
    <section>
      <h2 id="responses">Responses</h2>
      <ol aria-labelledby="responses">
        {responses.map((response, index) => (
          <li key={`response-${index}`}>{response}</li>
        ))}
      </ol>
    </section>
  )
}

export default Responses
