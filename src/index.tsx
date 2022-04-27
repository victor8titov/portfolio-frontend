import React, { FC, lazy } from 'react'
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group'
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes, useLocation, useMatch, useParams } from 'react-router-dom'

import App from './App'
import Contact from './components/pages/contact'
import Experience from './components/pages/experience'
import Main from './components/pages/main'
import Skills from './components/pages/skills'
import Works from './components/pages/works'
import { CONTACT, EXPERIENCE, MAIN, SKILLS, WORK, WORKS } from './constants/routes'
import store from './store'
import Work from './components/pages/work'

const root = createRoot(document.getElementById('root') as Element)

const RoutesC: FC = () => {
  const location = useLocation()
  return (
      <SwitchTransition >
        <CSSTransition key={location.key} classNames="action" timeout={1000}>
          <Routes location={location}>
            <Route path={MAIN} element={<Main />} />
            <Route path={WORKS} element={<Works />} />
            <Route path={WORK} element={<Work />} />
            <Route path={EXPERIENCE} element={<Experience />} />
            <Route path={SKILLS} element={<Skills />} />
            {/* <Route path={CONTACT} element={<Contact />} /> */}
            <Route path="*" element={<Main />} />
          </Routes>
        </CSSTransition>
      </SwitchTransition>
  )
}

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App >
        <RoutesC />
      </App>
    </BrowserRouter>
  </Provider>
)
