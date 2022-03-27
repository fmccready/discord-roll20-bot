/**
 * @jest-environment jsdom
 */
import { render, screen, within } from '@testing-library/react'
import React from 'react'
import { ResponseProvider } from './response-provider'
import Responses from './responses'

describe('<Responses />', () => {
  test(`Should show up in a list`, async () => {
    const expected = ['pong', 'pong']
    render(
      <ResponseProvider value={expected}>
        <Responses />
      </ResponseProvider>
    )
    const list = await screen.findByRole('list', { name: 'Responses' })
    const responses = within(list).getAllByRole('listitem')

    expect(responses.length).toBe(expected.length)
  })

  test(`Should show up in a list`, async () => {
    const expected = ['pong', 'pong']
    render(
      <ResponseProvider value={expected}>
        <Responses />
      </ResponseProvider>
    )
    const list = await screen.findByRole('list', { name: 'Responses' })
    const responses = within(list).getAllByRole('listitem')

    expect(responses.length).toBe(2)
  })
})
