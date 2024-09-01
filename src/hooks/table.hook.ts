import { useDispatch } from 'react-redux'
import { setTables } from '../redux/tableSlice'
import { useFetchTables } from '../services/table'

function useInitialTables(tablesAmount: number) {
  const dispatch = useDispatch()
  const getInitialTables = useFetchTables(tablesAmount)
  dispatch(setTables(getInitialTables()))

  return {
    getInitialTables,
  }
}

const tableHooks = {
  useInitialTables,
}

export default tableHooks
