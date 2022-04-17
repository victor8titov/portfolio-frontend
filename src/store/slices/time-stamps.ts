import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as restApi from '../../api'
import { errorSerialization } from '../utils'
import { TimeStampView } from '../../api/types/time-stamp.types'
import { QueryParameters } from '../../api/types/common'

export type TimeStampState = {
  timeStamps: TimeStampView[]
  timeStamp: TimeStampView | null
}

const initialState: TimeStampState = {
  timeStamp: null,
  timeStamps: []
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

const fetchTimeStampById = createAsyncThunk(
  'fetchTimeStampById',
  async (payload: QueryParameters & { id: string }, { rejectWithValue }) => {
    try {
      const { id, ...rest } = payload
      const response = await restApi.timeStamps.getById(id, rest)
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
      state.timeStamp = initialState.timeStamp
      state.timeStamps = initialState.timeStamps
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeStamps.fulfilled, (state, { payload }) => {
        state.timeStamps = payload.items
      })
      .addCase(fetchTimeStampById.fulfilled, (state, { payload }) => {
        state.timeStamp = payload
      })
  }
})

export default TimeStampsSlice.reducer

export const timeStampsAction = {
  ...TimeStampsSlice.actions,
  fetchTimeStamps,
  fetchTimeStampById
}
