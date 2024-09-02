import './styles.css'
import styled from 'styled-components'
import tableHooks from './hooks/table.hook'
import { TablesGrid } from './components/tables-grid'
import { useState } from 'react'
import useDebounce from './hooks/debounce.hook'

const TABLES_AMOUNT = 200
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
`

const Input = styled.input`
  font-size: 1.5rem;
  margin-left: 0.5rem;
  text-align: center;
  width: 5rem;
`

export const App = () => {
  const [tablesAmount, setTablesAmount] = useState(TABLES_AMOUNT)
  const debouncedValue = useDebounce(tablesAmount, 500)

  tableHooks.useInitialTables(debouncedValue)
  tableHooks.useUpdateTables()

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
          max={99999}
        />
      </InputWrapper>
      <TablesGrid></TablesGrid>
    </Container>
  )
}
