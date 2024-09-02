import './styles.css'
import styled from 'styled-components'
import tableHooks from './hooks/table.hook'
import { TablesGrid } from './components/tables-grid'
import { useState } from 'react'
import useDebounce from './hooks/debounce.hook'

const TABLES_AMOUNT = 200
const MAX_TABLES_AMOUNT = 10000
export const SCROLLBAR_WIDTH = 17

const Container = styled.div`
  height: calc(100vh - 6.5rem);
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const Input = styled.input`
  font-size: inherit;
  margin-left: 0.5rem;
  text-align: center;
  width: 5rem;
`

export const App = () => {
  const [tablesAmount, setTablesAmount] = useState(TABLES_AMOUNT)
  const debouncedValue = useDebounce(tablesAmount, 500)

  // Init tables
  tableHooks.useInitialTables(debouncedValue)
  // Update tables every 5 seconds
  tableHooks.useUpdateTables()

  // Validate value on input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, min, max } = event.target
    const eventValue = Number(value)
    const newValue = Math.max(Number(min), Math.min(Number(max), eventValue))

    if (!isNaN(newValue)) {
      setTablesAmount(newValue)
    }
  }

  return (
    <Container>
      <InputWrapper>
        <div>Table Amount:</div>
        <Input
          type="text"
          value={tablesAmount === 0 ? '' : tablesAmount}
          onChange={handleChange}
          min={0}
          max={MAX_TABLES_AMOUNT}
        />
      </InputWrapper>
      <TablesGrid></TablesGrid>
    </Container>
  )
}
