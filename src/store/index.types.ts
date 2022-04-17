import { ErrorResponse } from '../api/types/error.types'

export type ErrorInReject = {
  status: number,
  messages: ErrorResponse[]
}

export type ErrorSerializable = {
  status?: number | null
  messages: string[]
}
