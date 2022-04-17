import { ImageView } from './image.types'

export type SocialMediaView = {
  id: string
  name: string
  link: string
  icon?: ImageView
}

export type SocialMediaList = {
  items: SocialMediaView[]
}
