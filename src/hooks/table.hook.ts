import { useDispatch, useSelector } from 'react-redux'
import { setTables, tablesSelector, updateTables } from '../redux/tableSlice'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Tables, TableType } from '../models'
import { v4 as uuidv4 } from 'uuid'

const tableTypes = [
  TableType.BOOTH_TABLE,
  TableType.DINING_TABLE,
  TableType.OUTDOOR_TABLE,
  TableType.PRIVATE_DINING_TABLE,
]

const tableNames = {
  [TableType.BOOTH_TABLE]: 'Booth',
  [TableType.DINING_TABLE]: 'Dining',
  [TableType.OUTDOOR_TABLE]: 'Outdoor',
  [TableType.PRIVATE_DINING_TABLE]: 'Private',
}

const getInitialTables = (tablesAmount: number) => {
  const result: Tables = {}

  for (let i = 0; i < tablesAmount; i++) {
    const id = uuidv4()
    const type = tableTypes[Math.floor(Math.random() * tableTypes.length)]
    const maxGuests = Math.floor(Math.random() * 8) + 2
    const guests = Math.floor(Math.random() * (maxGuests + 1))
    result[id] = {
      type,
      name: `${tableNames[type]} ${i + 1}`,
      warning: Math.random() < 0.1,
      guests,
      maxGuests,
    }
  }

  return result
}

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

  // console.log(tables)
  // Update the ref when tables or tableKeys change
  useEffect(() => {
    // console.log(tables, tableKeys)
    tableIdsRef.current = tableKeys
    tablesRef.current = tables
  }, [tables, tableKeys])

  // Set up interval to update tableIdsToUpdate
  useEffect(() => {
    const interval = setInterval(() => {
      const tableIds = tableIdsRef.current
      const tmpKeys = [...tableIds]
      // console.log(tmpKeys)
      for (let i = tmpKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[tmpKeys[i], tmpKeys[j]] = [tmpKeys[j], tmpKeys[i]]
      }

      const tenPercent = Math.ceil(tmpKeys.length * 0.1)
      const selectedKeys = tmpKeys.slice(0, tenPercent)
      setTableIdsToUpdate(selectedKeys)
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, []) // Empty dependency array means this effect runs only once on mount

  // Update tables in Redux store
  useEffect(() => {
    if (tableIdsToUpdate.length > 0) {
      const result: Tables = {}
      const tablesTmp = tablesRef.current
      tableIdsToUpdate.forEach((key) => {
        if (tablesTmp[key]) {
          result[key] = { ...tablesTmp[key] }
          result[key].warning = !result[key].warning
          result[key].guests = Math.floor(
            Math.random() * (result[key].maxGuests + 1)
          )
        }
      })
      // console.log(result)
      dispatch(updateTables(result))
    }
  }, [dispatch, tableIdsToUpdate]) // Dependencies to trigger update when these change
}

const tableHooks = {
  useInitialTables,
  useUpdateTables,
}

export default tableHooks
