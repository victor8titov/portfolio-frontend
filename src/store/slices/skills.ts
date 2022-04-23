import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as restApi from '../../api'
import { errorSerialization } from '../utils'
import { ListSkillsResponse } from '../../api/types/skills.types'
import { QueryParameters } from '../../api/types/common'

export type SkillsState = {
  groups: string[]
  skills: ListSkillsResponse[]
  hasError: boolean
  loading: boolean
}

const initialState: SkillsState = {
  groups: [],
  skills: [],
  hasError: false,
  loading: false
}

const fetchSkills = createAsyncThunk(
  'fetchSkills',
  async (payload: QueryParameters, { rejectWithValue }) => {
    try {
      const response = await restApi.skills.getList(payload)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const SkillsSlice = createSlice({
  name: 'skills',
  initialState: initialState,
  reducers: {
    clear (state) {
      state.groups = initialState.groups
      state.skills = initialState.skills
      state.hasError = initialState.hasError
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.fulfilled, (state, { payload }) => {
        state.groups = payload.groups
        state.skills = [...state.skills, payload]
        state.loading = false
      })
      .addCase(fetchSkills.rejected, (state) => {
        state.hasError = true
        state.loading = false
      })
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true
      })
  }
})

export default SkillsSlice.reducer

export const skillsAction = {
  ...SkillsSlice.actions,
  fetchSkills
}
