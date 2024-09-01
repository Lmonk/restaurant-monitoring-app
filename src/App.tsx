import { useMemo } from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import { tablesSelector } from './redux/tableSlice'
import styled from 'styled-components'
import { TableComponent } from './components/table-component'
import { FixedSizeGrid as Grid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { convertRemToPixels, getMaxRows, groupTablesByType } from './utils'
import tableHooks from './hooks/table.hook'

const TABLES_AMOUNT = 200

interface TableElementProps {
  columnIndex: number
  rowIndex: number
  style?: React.CSSProperties
}

const Container = styled.div`
  height: calc(100vh - 4rem);
`

export const App = () => {
  tableHooks.useInitialTables(TABLES_AMOUNT)
  const tables = useSelector(tablesSelector)

  const tablesGroupedByType = useMemo(() => {
    return groupTablesByType(tables)
  }, [tables])

  const tableKeys = useMemo(() => {
    return Object.keys(tables)
  }, [tables])

  return (
    <Container>
      <AutoSizer>
        {({ width, height }) => (
          <Grid
            height={height}
            width={width}
            columnWidth={250}
            rowHeight={convertRemToPixels(5)}
            columnCount={4}
            rowCount={getMaxRows(tablesGroupedByType)}
          >
            {({ columnIndex, rowIndex, style }: TableElementProps) => {
              const tableKeysByType = tablesGroupedByType[columnIndex]
              return tableKeysByType[rowIndex] ? (
                <div style={style} key={tableKeys[rowIndex * 4 + columnIndex]}>
                  <TableComponent table={tables[tableKeysByType[rowIndex]]} />
                </div>
              ) : null
            }}
          </Grid>
        )}
      </AutoSizer>
    </Container>
  )
}
