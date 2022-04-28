import React, { FC, lazy } from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import { EXPERIENCE, MAIN, SKILLS, WORK, WORKS } from './constants/routes'
import store from './store'
import App from './App'
import Suspense from './components/common/suspense'
const Main = lazy(() => import('./components/pages/main'))
const Works = lazy(() => import('./components/pages/works'))
const Work = lazy(() => import('./components/pages/work'))
const Experience = lazy(() => import('./components/pages/experience'))
const Skills = lazy(() => import('./components/pages/skills'))
// const Contact = lazy(() => import('./components/pages/contact'))

const root = createRoot(document.getElementById('root') as Element)

const RoutesCustom: FC = () => {
  const location = useLocation()
  return (
      <SwitchTransition >
        <CSSTransition key={location.key} classNames="action" timeout={1000}>
          <Routes location={location}>
            <Route path={MAIN} element={<Suspense component={Main} />} />
            <Route path={WORKS} element={<Suspense component={Works} />} />
            <Route path={WORK} element={<Suspense component={Work} />} />
            <Route path={EXPERIENCE} element={<Suspense component={Experience} />} />
            <Route path={SKILLS} element={<Suspense component={Skills} />} />
            {/* <Route path={CONTACT} element={<Suspense component={Contact} />} /> */}
            <Route path="*" element={<Suspense component={Main} />} />
          </Routes>
        </CSSTransition>
      </SwitchTransition>
  )
}

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App >
        <RoutesCustom />
      </App>
    </BrowserRouter>
  </Provider>
)
