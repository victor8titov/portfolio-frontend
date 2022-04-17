import { ImageView } from '../api/types/image.types'
export type ImageTemplate = 'original' | 'mid' | 'small'

export function getUrlImageByTemplate (image: ImageView | undefined | null, template?: ImageTemplate): string {
  if (!image) return ''
  if (!Array.isArray(image.divisionByTemplates)) return ''

  const _template = template || 'original'

  const urls = image.divisionByTemplates.map((i) => ({ url: i.url, template: i.template }))

  const foundUrl = urls.find(
    (i) => i.template.includes(_template)
  )
  const url = foundUrl ? foundUrl.url : urls[0].url || ''

  return REST_API_URL + url
}
