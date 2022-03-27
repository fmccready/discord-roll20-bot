import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const Input = ({
  label,
  name,
  type,
  initialValue,
}: {
  label: string
  name: string
  type: string
  initialValue?: string
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm()

  return (
    <label>
      {label}
      <input {...register(name)} type={type} defaultValue={initialValue} />
    </label>
  )
}

export default Input
