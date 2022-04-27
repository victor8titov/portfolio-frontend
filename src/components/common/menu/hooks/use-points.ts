import { useMemo } from 'react'
import { CONTACT, EXPERIENCE, MAIN, SKILLS, WORKS } from '../../../../constants/routes'
import { useLocalizedStrings } from '../../../../localization/use-localized-strings'

type Point = {
  path: string
  text: string
}

type UsePoints = () => Point[]

const usePoints: UsePoints = () => {
  const { strings } = useLocalizedStrings()

  const points = useMemo(() => [
    { path: MAIN, text: strings.about },
    { path: WORKS, text: strings.works },
    { path: SKILLS, text: strings.skills },
    { path: EXPERIENCE, text: strings.experience },
    // { path: CONTACT, text: strings.contact }
  ], [strings])

  return points
}

export default usePoints
