import { EventAndDate, Language } from '../../types/common'
import { ImageView } from './image.types'
import { LinkView } from './link.types'

export type ProjectView = {
  readonly id?: string
  readonly name: string
  readonly type: string
  readonly spendTime: string
  readonly stack: string[]
  readonly events: EventAndDate[]
  readonly description?: string
  readonly images?: ImageView[]
  readonly links?: LinkView[]
  readonly languages?: Language[]
  readonly currentLanguage?: Language
}

export type ProjectList = {
  currentLanguage: string
  languages: string[]
  pagination?: {
    page: number
    pageSize: number
    totalPages: number
  }
  sorted?: string[]
  items: ProjectView[]
}
