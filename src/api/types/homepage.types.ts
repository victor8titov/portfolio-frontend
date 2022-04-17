import { Language } from '../../types/common'
import { AvatarView } from './image.types'

export type HomePageView = {
  readonly currentLanguage: Language
  readonly languages: Language[]
  readonly title: string
  readonly subtitle: string
  readonly description: string
  readonly avatars: AvatarView[] | null
}
