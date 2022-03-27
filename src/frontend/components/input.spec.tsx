/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import Input from './input'

describe('<Input />', () => {
  test(`should have a label that identifies it`, async () => {
    const expected = 'Expected label'

    render(<Input label={expected} type="text" name="inputName" />)

    const input = await waitFor(() => screen.getByLabelText(expected))

    expect(input.nodeType).toBe(Node.ELEMENT_NODE)
    expect(input.tagName).toBe('INPUT')
  })

  test(`can be updated`, async () => {
    const expected = 'Expected input value'

    render(<Input label={expected} type="text" name="inputName" />)

    const input = (await waitFor(() =>
      screen.getByLabelText(expected)
    )) as HTMLInputElement

    fireEvent.change(input, { target: { value: expected } })
    expect(input.value).toBe(expected)
  })
  test(`optionally has an initial value`, async () => {
    const expected = 'Expected initial value'
    const label = 'Label'
    render(
      <Input
        label={label}
        type="text"
        name="inputName"
        initialValue={expected}
      />
    )

    const input = (await waitFor(() =>
      screen.getByLabelText(label)
    )) as HTMLInputElement

    expect(input.value).toBe(expected)
  })
})
