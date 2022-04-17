import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { ErrorSerializable } from '../index.types'

type AlertSeverity = 'info' | 'success' | 'warning' | 'error' | undefined

export type AlertMessage = {
  message: string
  severity: AlertSeverity
}

export type AlertState = {
  messages: AlertMessage[]
  currentMessage: AlertMessage | null
}

export declare type ActionAddMatcher = PayloadAction<
  unknown,
  string,
  { arg: string; requestId: string; aborted: boolean; condition: boolean },
  SerializedError
>

const initialStateAlert: AlertState = {
  messages: [],
  currentMessage: null
}

const alertSlice = createSlice({
  name: 'alert',
  initialState: initialStateAlert,
  reducers: {
    pullMessage: (state) => {
      state.currentMessage = state.messages.shift() || null
    },
    pushMessage: (state, { payload }: PayloadAction<AlertMessage>) => {
      state.messages.push(payload)
      if (state.messages.length && !state.currentMessage) state.currentMessage = state.messages.shift() || null
    },
    clearMessages: () => {
      return initialStateAlert
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action): action is ActionAddMatcher => action.type.endsWith('/rejected'),
        (state, action) => {
          const payload = action.payload as ErrorSerializable

          if (!payload) return

          const { messages, status } = payload

          if (status === 401) {
            state.messages.push({
              severity: 'error',
              message: 'Unauthorized'
            })
            return
          }

          messages.forEach((_message) => state.messages.push({ severity: 'error', message: _message }))

          // init working of stack if message is first
          if (state.messages.length && !state.currentMessage) state.currentMessage = state.messages.shift() || null
        }
      )
  }
})

export default alertSlice.reducer

export const alertActions = alertSlice.actions
