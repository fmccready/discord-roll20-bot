import * as React from 'react'

interface IMessageForm {
  id?: number
  message?: string
  type?: string
}

export const MessageForm = (
  { id, message, type }: IMessageForm = {
    id: 1,
    message: 'ping',
    type: 'dm',
  }
) => (
  <form action="/message" method="POST">
    <label>
      message:
      <input type="text" name="message" value={message} />
    </label>
    <label>
      type:
      <input type="text" name="type" value={type} />
    </label>
    <label>
      id:
      <input type="text" name="id" value={id} />
    </label>
    <button type="submit">Send</button>
  </form>
)
