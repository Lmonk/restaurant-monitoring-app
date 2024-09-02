import { useDispatch, useSelector } from 'react-redux'
import { setTables, tablesSelector, updateTables } from '../redux/tableSlice'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Tables } from '../models'
import {
  getInitialTables,
  getTableIdsToUpdate,
  getTablesUpdate,
} from '../utils'

function useInitialTables(tablesAmount: number) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTables(getInitialTables(tablesAmount)))
  }, [dispatch, tablesAmount])
}

function useUpdateTables() {
  const dispatch = useDispatch()
  const [tableIdsToUpdate, setTableIdsToUpdate] = useState<string[]>([])
  const tables = useSelector(tablesSelector)
  const tableKeys = useMemo(() => Object.keys(tables), [tables])
  // Refs to store previous values
  const tablesRef = useRef<Tables>(tables)
  const tableIdsRef = useRef<string[]>(tableKeys)

  // Update the ref when tables or tableKeys change
  useEffect(() => {
    tableIdsRef.current = tableKeys
    tablesRef.current = tables
  }, [tables, tableKeys])

  // Set up interval to update tableIdsToUpdate
  useEffect(() => {
    const interval = setInterval(() => {
      const result = getTableIdsToUpdate(tableIdsRef.current, tablesRef.current)

      setTableIdsToUpdate(result)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Update tables in Redux store
  useEffect(() => {
    if (tableIdsToUpdate.length > 0) {
      const result = getTablesUpdate(tableIdsToUpdate, tablesRef.current)
      dispatch(updateTables(result))
    }
  }, [dispatch, tableIdsToUpdate])
}

const tableHooks = {
  useInitialTables,
  useUpdateTables,
}

export default tableHooks
