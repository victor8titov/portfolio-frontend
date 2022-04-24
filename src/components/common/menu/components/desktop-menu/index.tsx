import React, { FC, useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MAIN } from '../../../../../constants/routes'
import { uniteClasses } from '../../../../../utils/unite-style-classes'
import SquareMarker from '../../../square-marker'
import usePoints from '../../hooks/use-points'
import Link from '../link'
import './styles.scss'

const DesktopMenu: FC = () => {
  const [active, setActive] = useState<string>(MAIN)
  const navigate = useNavigate()
  const points = usePoints()

  const timerId = useRef<NodeJS.Timeout | null>(null)
  const handleMouseEntre = useCallback((e: any) => {
    if (timerId.current) clearTimeout(timerId.current)

    e.currentTarget.classList.add('desktop-menu_entry')
    e.currentTarget.classList.remove('desktop-menu_leave')
  }, [])

  const handleMouseLeave = useCallback((e: any) => {
    const elm = e.currentTarget

    const _timerId = setTimeout(() => {
      elm.classList.remove('desktop-menu_entry')
      elm.classList.add('desktop-menu_leave')
    }, 1500)

    timerId.current = _timerId
  }, [])

  const handleClickMarker = useCallback((path: string) => () => {
    navigate(path)
  }, [navigate])

  return (
    <menu className='desktop-menu' onMouseEnter={handleMouseEntre} onMouseLeave={handleMouseLeave}>
      {points.map(({ path, text }, index) => {
        const isActive = path === active
        return (
          <li
            key={path}
            className={uniteClasses('desktop-menu__item', isActive && 'desktop-menu__item_active')} >
              <Link style={{ animationDelay: index * 80 + 'ms' }} to={path} onActive={() => setActive(path)}>
                {text}
              </Link>
              <div className='desktop-menu__box-marker' onClick={handleClickMarker(path)}>
                <SquareMarker active={isActive}/>
              </div>
          </li>
        )
      })}
    </menu>
  )
}

export default DesktopMenu
