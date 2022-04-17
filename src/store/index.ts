import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../store/slices'

const store = configureStore({
  reducer: rootReducer,
  devTools: NODE_ENV !== 'production'
})

export type State = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch;

export default store
