import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from './input'
import { useResponse } from './response-provider'

const MessageForm = ({ message = '', type = 'dm' }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const { setResponses } = useResponse()

  interface FormValues {
    message: string
    type: string
  }

  const onSubmit: SubmitHandler<FormValues> = request => {
    fetch('/message', {
      body: JSON.stringify(request),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(({ responses }) =>
        setResponses({ type: 'add', response: responses })
      )
      .catch(error => console.log(error))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="/message" method="POST">
      <label>
        message
        <input {...register('message')} defaultValue={message} type="text" />
      </label>
      <label>
        type
        <input {...register('type')} defaultValue={type} type="text" />
      </label>
      <button type="submit">Send</button>
    </form>
  )
}
export default MessageForm
