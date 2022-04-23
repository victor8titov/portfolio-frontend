import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as restApi from '../../api'
import { QueryParameters } from '../../api/types/common'
import { HomePageView } from '../../api/types/homepage.types'

import { errorSerialization } from '../utils'

export type HomePageState = {
  homePageList: HomePageView[]
  loading: boolean
  hasError: boolean
}

const initialState: HomePageState = {
  homePageList: [],
  loading: false,
  hasError: false
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
      state.homePageList = initialState.homePageList
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomePage.fulfilled, (state, { payload }) => {
        state.homePageList = [...state.homePageList.filter(i => i.currentLanguage !== payload.currentLanguage), payload]
        state.loading = false
      })
      .addCase(fetchHomePage.rejected, (state) => {
        state.hasError = true
        state.loading = false
      })
      .addCase(fetchHomePage.pending, (state) => {
        state.loading = true
      })
  }
})

export default homePageSlice.reducer

export const homePageActions = {
  ...homePageSlice.actions,
  fetchHomePage
}
