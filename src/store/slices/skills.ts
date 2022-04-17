import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as restApi from '../../api'
import { errorSerialization } from '../utils'
import { SkillView } from '../../api/types/skills.types'
import { QueryParameters } from '../../api/types/common'

export type SkillsState = {
  groups: string[]
  skills: SkillView[]
  skill: SkillView | null
}

const initialState: SkillsState = {
  skill: null,
  groups: [],
  skills: []
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

const fetchSkillById = createAsyncThunk(
  'fetchSkillById',
  async (payload: QueryParameters & { id: string }, { rejectWithValue }) => {
    try {
      const { id, ...rest } = payload
      const response = await restApi.skills.getById(id, rest)
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
      state.skill = initialState.skill
      state.skills = initialState.skills
    },
    clearSkill (state) {
      state.skill = initialState.skill
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.fulfilled, (state, { payload }) => {
        state.groups = payload.groups
        state.skills = payload.items
      })
      .addCase(fetchSkillById.fulfilled, (state, { payload }) => {
        state.skill = payload
      })
  }
})

export default SkillsSlice.reducer

export const skillsAction = {
  ...SkillsSlice.actions,
  fetchSkills,
  fetchSkillById
}
