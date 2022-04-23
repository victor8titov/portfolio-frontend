import React, { FC } from 'react'
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
