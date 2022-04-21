export function uniteClasses (...arg: unknown[]): string {
  const filtered = arg.filter(i => i && typeof i === 'string')
  return filtered.length ? filtered.join(' ') : ''
}
