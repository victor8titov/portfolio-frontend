
export const MAIN = '/'
export const WORKS = 'works'
export const EXPERIENCE = 'experience'
export const SKILLS = 'skills'
export const CONTACT = 'contact'

export function pathJoin (...arg: (string | number)[]): string {
  return '/' + arg.reduce((previousValue: string | number, currentValue: string | number) => previousValue + '/' + currentValue)
}
