import { EventAndDate, Language } from '../../types/common'

export type TimeStampView = {
  readonly id?: string
  readonly name?: string
  readonly description?: string
  readonly link?: string
  readonly events?: EventAndDate[]
}

export type ListTimeStamps = {
  languages: Language[]
  currentLanguage: Language
  items: TimeStampView[]
}
