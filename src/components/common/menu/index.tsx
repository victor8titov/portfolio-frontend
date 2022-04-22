import React, { FC } from 'react'
import DesktopMenu from './components/desktop-menu'
import MobileMenu from './components/mobile-menu'

type Props = {
  mode?: 'mobile' | 'desktop'
}

const Menu: FC<Props> = ({ mode = 'desktop' }) => {
  return !mode || mode === 'desktop'
    ? <DesktopMenu />
    : <MobileMenu />
}

export default Menu
