import React, { FC, useCallback } from 'react'
import { useLocalizedStrings } from '../../../localization/use-localized-strings'
import { Language } from '../../../types/common'
import { uniteClasses } from '../../../utils/unite-style-classes'
import Navigation from '../navigation'
import './styles.scss'

const Header: FC = () => {
  const { currentLanguage, setLanguage } = useLocalizedStrings()

  const handleClickLanguage = useCallback((newLanguage: Language) => () => {
    if (newLanguage !== currentLanguage) setLanguage(newLanguage)
  }, [setLanguage, currentLanguage])

  return (
    <header className="header">
      <Navigation />

      <div className="header__language">
        {Object.values(Language).map(i => (
          <button
            onClick={handleClickLanguage(i)}
            className={
              uniteClasses('header__language-button', i === currentLanguage ? 'header__language-button_active' : '')}
            key={i} >
              {i}
            </button>
        ))}
      </div>
    </header>
  )
}

export default Header
