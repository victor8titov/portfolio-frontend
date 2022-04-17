import { Language } from '../../types/common'

export type SkillView = {
  readonly id?: string
  readonly name?: string
  readonly group?: string
  readonly level?: number
  readonly description?: string
  readonly currentLanguage?: Language
}

export type ListSkillsResponse = {
  languages: Language[]
  currentLanguage: Language
  groups: string[]
  items: SkillView[]
}
