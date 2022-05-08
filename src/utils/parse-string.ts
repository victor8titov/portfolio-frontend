import { decode } from 'html-entities'

export function parseString (string: string | undefined | null): string[] {
  if (!string || !string?.length) return []
  const parsed = decode(string)
  const result = parsed.split('\n').filter(i => i) || ['']

  return result
}
