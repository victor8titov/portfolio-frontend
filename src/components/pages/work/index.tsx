import React, { FC } from 'react'
import { useLocalizedStrings } from '../../../localization/use-localized-strings'

const Work: FC = () => {
  const { strings } = useLocalizedStrings()
  return (
    <div>
      <h1>{strings.work}</h1>
    </div>
  )
}

export default Work
