import './styles.css'
import styled from 'styled-components'
import tableHooks from './hooks/table.hook'
import { TablesGrid } from './components/tables-grid'

const TABLES_AMOUNT = 100

const Container = styled.div`
  height: calc(100vh - 6.5rem);
`

export const App = () => {
  tableHooks.useInitialTables(TABLES_AMOUNT)
  tableHooks.useUpdateTables()

  return (
    <Container>
      <TablesGrid></TablesGrid>
    </Container>
  )
}
