import React, { FC, ReactChild } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group'
import Header from './components/common/header'
import { useInitLocalization } from './localization/use-init-localization'
import './styles/index.scss'

type Props = {
  children: ReactChild
}

const App: FC<Props> = ({ children }) => {
  useInitLocalization()
  return (
    <div className='app'>

      <Header />

      <main>
       {children}
      </main>

      <footer >
        footer
      </footer>

    </div>
  )
}

export default App
