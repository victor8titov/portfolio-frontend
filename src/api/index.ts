import axios, { AxiosResponse } from 'axios'
import { QueryParameters } from './types/common'
import { HomePageView } from './types/homepage.types'
import { ProjectList, ProjectView } from './types/projects'
import { ListSkillsResponse, SkillView } from './types/skills.types'
import { SocialMediaList } from './types/social-media.types'
import { ListTimeStamps, TimeStampView } from './types/time-stamp.types'

const instance = axios.create({
  baseURL: REST_API_URL
})

export const homepage = {
  get: async ({ language }: QueryParameters): Promise<AxiosResponse<HomePageView>> =>
    await instance.get(`${REST_API_URL}/api/homepage${language ? '?language=' + language : ''}`)
}

export const skills = {
  getList: async ({ language }: QueryParameters): Promise<AxiosResponse<ListSkillsResponse>> =>
    await instance.get(`${REST_API_URL}/api/skills${language ? '?language=' + language : ''}`),

  getById: async (id: string, { language } : QueryParameters): Promise<AxiosResponse<SkillView>> =>
    await instance.get(`${REST_API_URL}/api/skill/${id}${language ? '?language=' + language : ''}`)
}

export const timeStamps = {
  getList: async ({ language }: QueryParameters): Promise<AxiosResponse<ListTimeStamps>> =>
    await instance.get(`${REST_API_URL}/api/time-stamps${language ? '?language=' + language : ''}`),

  getById: async (id: string, { language }: QueryParameters): Promise<AxiosResponse<TimeStampView>> =>
    await instance.get(`${REST_API_URL}/api/time-stamp/${id}${language ? '?language=' + language : ''}`)
}

export const projects = {
  getList: async ({ page, pageSize, language }: QueryParameters): Promise<AxiosResponse<ProjectList>> =>
    await instance.get(`${REST_API_URL}/api/projects?page=${page}&pageSize=${pageSize}&language=${language}`),

  getById: async (id: string, { language }: QueryParameters): Promise<AxiosResponse<ProjectView>> =>
    await instance.get(`${REST_API_URL}/api/project/${id}${language ? '?language=' + language : ''}`)
}

export const socialMedia = {
  get: async (): Promise<AxiosResponse<SocialMediaList>> =>
    await instance.get(`${REST_API_URL}/api/social-media/`)
}
