import { AxiosError } from 'axios'
import { ErrorBodyResponse } from '../api/types/error.types'
import { ErrorSerializable } from './index.types'

export function errorSerialization (error: any): ErrorSerializable {
  const value: ErrorSerializable = {
    messages: []
  }

  if (error.isAxiosError) {
    const { response } = error as AxiosError<ErrorBodyResponse>
    if (!response) return value

    const { status, data: { errors } } = response
    value.status = status
    value.messages = errors?.map(i => `${i.message} ${i.source || ''}`) || []

    return value
  }

  if (error instanceof Error) {
    value.messages.push(error.message)

    return value
  }

  if (typeof error === 'string' && NODE_ENV === 'development') {
    value.messages.push(error)
  }

  return value
}
