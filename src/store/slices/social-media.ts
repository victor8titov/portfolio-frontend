import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as restApi from '../../api'
import { errorSerialization } from '../utils'
import { SocialMediaView } from '../../api/types/social-media.types'

export type SocialMediaState = {
  socialMedia: SocialMediaView[]
  loading: boolean
  hasError: boolean
}

const initialState: SocialMediaState = {
  socialMedia: [],
  loading: false,
  hasError: false
}

const fetchSocialMedia = createAsyncThunk(
  'fetchSocialMedia',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await restApi.socialMedia.get()
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const socialMediaSlice = createSlice({
  name: 'socialMedia',
  initialState: initialState,
  reducers: {
    clear (state) {
      state.socialMedia = initialState.socialMedia
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocialMedia.fulfilled, (state, { payload }) => {
        state.socialMedia = payload.items
        state.loading = false
      })
      .addCase(fetchSocialMedia.rejected, (state) => {
        state.hasError = true
        state.loading = false
      })
      .addCase(fetchSocialMedia.pending, (state) => {
        state.loading = true
      })
  }
})

export default socialMediaSlice.reducer

export const socialMediaAction = {
  ...socialMediaSlice.actions,
  fetchSocialMedia
}
