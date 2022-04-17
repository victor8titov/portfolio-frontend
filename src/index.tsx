import React, { lazy } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { createRoot } from 'react-dom/client'

import App from './App'
import store from './store'

// const root = createRoot(document.getElementById('root') as Element)

// TODO have problem with select from antd. Browser freeze if use antd select
// it is happening if use react 18
// root.render(

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />} >
            <Route path='/' element={<div>test page</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>, document.getElementById('root'))
