import React, { FC, useCallback } from 'react'
import { useLocalizedStrings } from '../../../localization/use-localized-strings'
import { Language } from '../../../types/common'
import { uniteClasses } from '../../../utils/unite-style-classes'
import useBreakpoint from '../../../utils/use-breakpoint'
import Menu from '../menu'
import SwitcherLanguages from '../switcher-languages'
import './styles.scss'

const Header: FC = () => {
  const isDesktop = useBreakpoint().md

  return (
    <header className="header">
      <nav className='navigation'>
        <Menu mode={isDesktop ? 'desktop' : 'mobile'} />
      </nav>

      {isDesktop ? <SwitcherLanguages /> : null}
    </header>
  )
}

export default Header
