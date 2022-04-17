export type ErrorResponse = {
  message: string
  source?: string
  type?: string
}

export type ErrorBodyResponse = {
  errors: ErrorResponse[]
}
