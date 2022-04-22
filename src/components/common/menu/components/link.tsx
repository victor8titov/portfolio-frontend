import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

const Link: FC<{ style?: any, to: string, children: React.ReactNode, onActive: () => void}> =
({ to, onActive, children, style = '' }) => (
    <NavLink to={to} style={style}>
      {({ isActive }) => {
        if (isActive) onActive()
        return children
      }}
    </NavLink>
)

export default Link
