import React, { FC, MouseEvent, SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CONTACT, EXPERIENCE, MAIN, SKILLS, WORKS } from '../../../constants/routes'
import { useLocalizedStrings } from '../../../localization/use-localized-strings'
import { uniteClasses } from '../../../utils/unite-style-classes'
import SquareMarker from '../square-marker'
import './styles.scss'

const Link: FC<{ style?: any, to: string, children: React.ReactNode, onActive: () => void}> =
({ to, onActive, children, style = '' }) => (
    <NavLink to={to} style={style}>
      {({ isActive }) => {
        if (isActive) onActive()
        return children
      }}
    </NavLink>
)

const Navigation: FC = () => {
  const [active, setActive] = useState<string>(MAIN)
  const { strings } = useLocalizedStrings()

  const points = useMemo(() => [
    { path: MAIN, text: strings.about },
    { path: WORKS, text: strings.works },
    { path: SKILLS, text: strings.skills },
    { path: EXPERIENCE, text: strings.experience },
    { path: CONTACT, text: strings.contact }
  ], [strings])

  const timerId = useRef<NodeJS.Timeout | null>(null)
  const handleMouseEntre = useCallback((e: any) => {
    if (timerId.current) clearTimeout(timerId.current)

    e.currentTarget.classList.add('navigation_entry')
    e.currentTarget.classList.remove('navigation_leave')
  }, [])

  const handleMouseLeave = useCallback((e: any) => {
    const elm = e.currentTarget

    const _timerId = setTimeout(() => {
      elm.classList.remove('navigation_entry')
      elm.classList.add('navigation_leave')
    }, 1500)

    timerId.current = _timerId
  }, [])

  return (
    <div className='navigation' onMouseEnter={handleMouseEntre} onMouseLeave={handleMouseLeave}>

      <ul className='navigation__list'>
        {points.map(({ path, text }, index) => {
          const isActive = path === active
          return (
            <li
              // style={{ top: index * 40 + 'px' }}
              key={path}
              className={uniteClasses('navigation__item', isActive && 'navigation__item_active')} >
                <Link style={{ animationDelay: index * 80 + 'ms' }} to={path} onActive={() => setActive(path)}>
                  {text}
                </Link>
                <SquareMarker active={isActive}/>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Navigation
