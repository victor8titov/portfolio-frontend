import React, { FC } from 'react'
import { useLocalizedStrings } from '../../../localization/use-localized-strings'
import './styles.scss'

const Works: FC = () => {
  const { strings } = useLocalizedStrings()
  return (
    <div className='works'>
      <h1>{strings.works}</h1>
    </div>
  )
}

export default Works
