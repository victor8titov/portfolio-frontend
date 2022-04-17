import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const App: FC = () => {
  return (
    <div>
      <h1>App wrapper</h1>
      <Outlet />
    </div>
  )
}

export default App
