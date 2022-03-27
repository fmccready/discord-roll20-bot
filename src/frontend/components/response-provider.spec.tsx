/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import React from 'react'
import {
  ResponseConsumer,
  ResponseProvider,
  useResponse,
} from './response-provider'

describe('Response provider', () => {
  it('should provide a list of responses', () => {
    const expectedMessage = 'Hello!'
    const expected = [expectedMessage]

    render(
      <ResponseProvider value={expected}>
        <ResponseConsumer>
          {({ responses }) =>
            responses.map((message, index) => <div key={index}>{message}</div>)
          }
        </ResponseConsumer>
      </ResponseProvider>
    )
    expect(screen.getByText(expectedMessage)).toBeVisible()
  })

  it('should return the response using a hook', () => {
    const expectedMessage = 'Hello!'
    const expected = [expectedMessage]

    const TestComponent = () => {
      const { responses } = useResponse()
      return (
        <>
          {responses.map((message, index) => <div key={index}>{message}</div>)}
        </>
      )
    }

    render(
      <ResponseProvider value={expected}>
        <TestComponent />
      </ResponseProvider>
    )
    expect(screen.getByText(expectedMessage)).toBeVisible()
  })

  it('should add a new response', () => {
    const expectedInitialResponse = 'Hello!'
    const initialResponses = [expectedInitialResponse]
    const expectedAdditionalResponse = 'World!'

    const TestDispatch = () => {
      const { setResponses } = useResponse()

      return (
        <button
          onClick={() =>
            setResponses({ type: 'add', response: expectedAdditionalResponse })
          }
        >
          add
        </button>
      )
    }

    const TestComponent = () => {
      const { responses } = useResponse()
      return (
        <>
          {responses.map((message, index) => <div key={index}>{message}</div>)}
        </>
      )
    }

    render(
      <ResponseProvider value={initialResponses}>
        <TestDispatch />
        <TestComponent />
      </ResponseProvider>
    )

    expect(screen.getByText(expectedInitialResponse)).toBeVisible()
    expect(
      screen.queryByText(expectedAdditionalResponse)
    ).not.toBeInTheDocument()
    screen.getByRole('button', { name: /add/i }).click()
    expect(screen.getByText(expectedInitialResponse)).toBeVisible()
    expect(screen.getByText(expectedAdditionalResponse)).toBeVisible()
  })

  it('should clear the responses', () => {
    const expectedInitialResponse = 'Hello!'
    const initialResponses = [expectedInitialResponse]

    const TestDispatch = () => {
      const { setResponses } = useResponse()

      return (
        <button onClick={() => setResponses({ type: 'clear' })}>clear</button>
      )
    }

    const TestComponent = () => {
      const { responses } = useResponse()
      return (
        <>
          {responses.map((message, index) => <div key={index}>{message}</div>)}
        </>
      )
    }

    render(
      <ResponseProvider value={initialResponses}>
        <TestDispatch />
        <TestComponent />
      </ResponseProvider>
    )

    expect(screen.getByText(expectedInitialResponse)).toBeVisible()
    screen.getByRole('button', { name: /clear/i }).click()
    expect(screen.queryByText(expectedInitialResponse)).not.toBeInTheDocument()
  })

  it('should return the existing responses for an unknown dispatch type', () => {
    const expectedInitialResponse = 'Hello!'
    const initialResponses = [expectedInitialResponse]

    const TestDispatch = () => {
      const { setResponses } = useResponse()

      return (
        <button onClick={() => setResponses({ type: 'unknown' })}>
          unknown
        </button>
      )
    }

    const TestComponent = () => {
      const { responses } = useResponse()
      return (
        <ul>
          {responses.map((message, index) => <li key={index}>{message}</li>)}
        </ul>
      )
    }

    render(
      <ResponseProvider value={initialResponses}>
        <TestDispatch />
        <TestComponent />
      </ResponseProvider>
    )

    expect(screen.getAllByRole('listitem').length).toBe(1)
    screen.getByRole('button', { name: /unknown/i }).click()
    expect(screen.getAllByRole('listitem').length).toBe(1)
  })
})
