import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  types: [], // ['domestic','international']
}

const adminFiltersSlice = createSlice({
  name: 'adminFilters',
  initialState,
  reducers: {
    toggleType(state, action) {
      const t = action.payload
      if (state.types.includes(t)) {
        state.types = state.types.filter((x) => x !== t)
      } else {
        state.types.push(t)
      }
    },
    clearFilters(state) {
      state.types = []
    },
  },
})

export const { toggleType, clearFilters } = adminFiltersSlice.actions
export default adminFiltersSlice.reducer


