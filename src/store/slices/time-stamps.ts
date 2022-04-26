import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as restApi from '../../api'
import { errorSerialization } from '../utils'
import { ListTimeStamps } from '../../api/types/time-stamp.types'
import { QueryParameters } from '../../api/types/common'
import { platform } from 'os'

export type TimeStampState = {
  timeStamps: ListTimeStamps[]
  loading: boolean
  hasError: boolean
  isEmpty: boolean
}

const initialState: TimeStampState = {
  timeStamps: [],
  loading: false,
  hasError: false,
  isEmpty: false

}

const fetchTimeStamps = createAsyncThunk(
  'fetchTimeStamps',
  async (payload: QueryParameters, { rejectWithValue }) => {
    try {
      const response = await restApi.timeStamps.getList(payload)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const TimeStampsSlice = createSlice({
  name: 'timeStamps',
  initialState: initialState,
  reducers: {
    clear (state) {
      state.timeStamps = initialState.timeStamps
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeStamps.fulfilled, (state, { payload }) => {
        state.loading = false

        if (!payload.items.length) {
          state.isEmpty = true
          return
        }

        state.timeStamps = [...state.timeStamps, payload]
      })
      .addCase(fetchTimeStamps.rejected, (state) => {
        state.hasError = true
        state.loading = false
      })
      .addCase(fetchTimeStamps.pending, (state) => {
        state.loading = true
      })
  }
})

export default TimeStampsSlice.reducer

export const timeStampsAction = {
  ...TimeStampsSlice.actions,
  fetchTimeStamps
}
