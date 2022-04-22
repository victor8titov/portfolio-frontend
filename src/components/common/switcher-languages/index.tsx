import React, { FC, SyntheticEvent, useCallback } from 'react'
import { useLocalizedStrings } from '../../../localization/use-localized-strings'
import { Language } from '../../../types/common'
import { uniteClasses } from '../../../utils/unite-style-classes'
import './styles.scss'

const SwitcherLanguages: FC = () => {
  const { currentLanguage, setLanguage } = useLocalizedStrings()

  const handleClickLanguage = useCallback((newLanguage: Language) => (e: SyntheticEvent) => {
    e.stopPropagation()
    if (newLanguage !== currentLanguage) setLanguage(newLanguage)
  }, [setLanguage, currentLanguage])

  return (
      <div className="languages">
        {Object.values(Language).map(i => (
          <button
            onClick={handleClickLanguage(i)}
            className={
              uniteClasses('languages__button', i === currentLanguage ? 'languages__button_active' : '')}
            key={i} >
              {i}
            </button>
        ))}
      </div>
  )
}

export default SwitcherLanguages
