import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as restApi from '../../api'
import { errorSerialization } from '../utils'
import { Language, Pagination } from '../../types/common'
import { QueryParameters } from '../../api/types/common'
import { ActionAddMatcher } from './alert'
import { ProjectView } from '../../api/types/projects'

export type ProjectState = {
  projects: ProjectView[]
  project: ProjectView | null
  pagination: Pagination | null
  isLoading: boolean,
}

const initialState: ProjectState = {
  project: null,
  projects: [],
  pagination: null,
  isLoading: false
}

const fetchProjects = createAsyncThunk(
  'fetchProjects',
  async ({ page = 1, pageSize = 10, language = Language.EN }: QueryParameters, { rejectWithValue }) => {
    try {
      const response = await restApi.projects.getList({ page, pageSize, language })
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const fetchProjectById = createAsyncThunk(
  'fetchProjectById',
  async (payload: QueryParameters & { id: string }, { rejectWithValue }) => {
    try {
      const { id, ...rest } = payload
      const response = await restApi.projects.getById(id, rest)
      return response.data
    } catch (e) {
      return rejectWithValue(errorSerialization(e))
    }
  }
)

const projectSlice = createSlice({
  name: 'projects',
  initialState: initialState,
  reducers: {
    clear (state) {
      state.project = initialState.project
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, { payload }) => {
        state.projects = payload.items
        state.pagination = payload.pagination || null
      })
      .addCase(fetchProjectById.fulfilled, (state, { payload }) => {
        state.project = payload
      })
      .addMatcher(
        (action): action is ActionAddMatcher => /Project.+\/(rejected|fulfilled)/.test(action.type),
        (state) => {
          state.isLoading = false
        }
      )
      .addMatcher(
        (action): action is ActionAddMatcher => /Project.+\/pending/.test(action.type),
        (state) => {
          state.isLoading = true
        }
      )
  }
})

export default projectSlice.reducer

export const projectsAction = {
  ...projectSlice.actions,
  fetchProjects,
  fetchProjectById
}
