import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Tables } from '../models'
import { RootState } from './store'

// import { RootState } from '@/redux/store'

interface TableSlice {
  tables: Tables
}

const initialState: TableSlice = {
  tables: {},
}
const slice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTables: (state, action: PayloadAction<Tables>) => ({
      ...state,
      tables: action.payload,
    }),
    updateTables: (state, action: PayloadAction<Tables>) => ({
      ...state,
      tables: {
        ...state.tables,
        ...action.payload,
      },
    }),
  },
})

export const tableReducer = slice.reducer
export const { setTables, updateTables } = slice.actions

export const tablesSelector = (state: RootState) => state.table.tables
