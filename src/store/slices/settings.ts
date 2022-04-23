import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Language } from '../../types/common'

export type SettingsState = {
  language: Language | null
}

const initialState: SettingsState = {
  language: null
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setLanguage (state, action: PayloadAction<Language>) {
      state.language = action.payload
    }
  }
})

export default settingsSlice.reducer

export const settingsActions = {
  ...settingsSlice.actions
}
