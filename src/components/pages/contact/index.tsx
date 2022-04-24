import React, { FC } from 'react'
import { useLocalizedStrings } from '../../../localization/use-localized-strings'

const Contact: FC = () => {
  const { strings } = useLocalizedStrings()

  return (
    <div>
      <h1>{strings.contact}</h1>
    </div>
  )
}

export default Contact
