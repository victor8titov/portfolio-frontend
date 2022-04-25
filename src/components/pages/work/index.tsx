import React, { FC } from 'react'
import { useLocalizedStrings } from '../../../localization/use-localized-strings'
import useContentManager from './hooks/use-content-content'

const Work: FC = () => {
  const { strings } = useLocalizedStrings()
  const {} = useContentManager()

  return (
    <div>
      <h1>{strings.work}</h1>
    </div>
  )
}

export default Work
