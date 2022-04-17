import { Pagination } from '../../types/common'

export type ImageByTemplateView = {
  url: string
  name: string
  template: string
  width?: number | null | string
  height?: number | null | string
}

export type ImageView = {
  id: string
  description: string
  divisionByTemplates: ImageByTemplateView[]
}

export type ListImages = {
  pagination?: Pagination
  items?: ImageView[]
}

export type AvatarView = {
  readonly type: string
  readonly image: ImageView
}
