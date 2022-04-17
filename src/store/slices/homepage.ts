import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as restApi from '../../api'
import { QueryParameters } from '../../api/types/common'
import { HomePageView } from '../../api/types/homepage.types'

import { errorSerialization } from '../utils'

export type HomePageState = {
  data: HomePageView | null
}

const initialState: HomePageState = {
  data: null
}

const fetchHomePage = createAsyncThunk(
  'fetchHomePage',
  async (payload: QueryParameters, { rejectWithValue }) => {
    try {
      const response = await restApi.homepage.get(payload)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const homePageSlice = createSlice({
  name: 'homePage',
  initialState: initialState,
  reducers: {
    clear (state) {
      state.data = initialState.data
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomePage.fulfilled, (state, { payload }) => {
        state.data = payload
      })
  }
})

export default homePageSlice.reducer

export const homePageActions = {
  ...homePageSlice.actions,
  fetchHomePage
}
