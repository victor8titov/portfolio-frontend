import React, { FC, useCallback, useState } from 'react'
import { MAIN } from '../../../../../constants/routes'
import { uniteClasses } from '../../../../../utils/unite-style-classes'
import SwitcherLanguages from '../../../switcher-languages'
import useManageBodyScroll from '../../hooks/use-manage-body-scroll'
import usePoints from '../../hooks/use-points'
import Link from '../link'
import './styles.scss'

const MobileMenu: FC = () => {
  const [active, setActive] = useState<string>(MAIN)
  const points = usePoints()

  const handleResizeWidthBody = useCallback(() => {
    const burgerMenuElement = document.querySelector('.mobile-menu')
    if (burgerMenuElement) {
      burgerMenuElement.classList.remove('mobile-menu_active')
      burgerMenuElement.classList.add('mobile-menu_not-active')
    }
  }, [])

  const { showScroll, hideScroll } = useManageBodyScroll(handleResizeWidthBody)

  const handleClickBurgerMenu = useCallback((e: any) => {
    const classList = e.currentTarget.classList
    classList.toggle('mobile-menu_active')

    if (classList.contains('mobile-menu_active')) {
      classList.remove('mobile-menu_not-active')
      hideScroll()
    } else {
      classList.add('mobile-menu_not-active')
      showScroll()
    }
  }, [hideScroll, showScroll])

  const handleClickLinkOnMobileMenu = useCallback(() => {
    showScroll()
  }, [showScroll])

  return (
    <div className="mobile-menu" onClick={handleClickBurgerMenu}>
      <div className="mobile-menu__burger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className='mobile-menu__mask'>
        <div className='mobile-menu__content'>
          <div>
            <div>
              <SwitcherLanguages />
            </div>
            <menu>
              {points.map(({ path, text }, index) => {
                const isActive = path === active
                return (
                  <li
                    onClick={handleClickLinkOnMobileMenu}
                    key={path}
                    className={uniteClasses('mobile-menu__item', isActive && 'mobile-menu__item_active')} >
                      <Link style={{ animationDelay: index * 80 + 'ms' }} to={path} onActive={() => setActive(path)}>
                        {text}
                      </Link>
                  </li>
                )
              })}
            </menu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
