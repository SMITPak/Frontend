import { configureStore } from '@reduxjs/toolkit'
import counterCartSlice from './src/Redux/countCart'

export const store = configureStore({
  reducer: {
    count: counterCartSlice
  },
})