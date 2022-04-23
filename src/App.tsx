import React, { FC, ReactChild } from 'react'
import Footer from './components/common/footer'
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

      <Footer />
    </div>
  )
}

export default App
