/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import App from '../App'

describe('<MessageForm>', () => {
  test('POSTs data to the server when the "Send" button is clicked', async () => {
    render(<App />)
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: 'ping' },
    })
    const submitButton = screen.getByRole('button', { name: /send/i })

    fireEvent.click(submitButton)

    expect(await screen.findByText(/pong/i)).toBeVisible()
  })
})
