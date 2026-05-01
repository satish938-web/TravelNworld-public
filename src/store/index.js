import { configureStore } from '@reduxjs/toolkit'
import adminFiltersReducer from './adminFiltersSlice'

export const adminStore = configureStore({
  reducer: {
    adminFilters: adminFiltersReducer,
  },
})


