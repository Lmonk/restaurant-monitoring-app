import { useMemo } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { TableComponent } from './table-component'
import { FixedSizeGrid as Grid } from 'react-window'
import { getGridRowHeight, getMaxTables, groupTablesByType } from '../utils'
import { useSelector } from 'react-redux'
import { tablesSelector } from '../redux/tableSlice'
import { Header } from './header'
import { SCROLLBAR_WIDTH } from '../App'

interface TableElementProps {
  columnIndex: number
  rowIndex: number
  style?: React.CSSProperties
}

export const TablesGrid = () => {
  const tables = useSelector(tablesSelector)

  const tablesGroupedByType = useMemo(() => {
    return groupTablesByType(tables)
  }, [tables])

  const tableKeys = useMemo(() => {
    return Object.keys(tables)
  }, [tables])

  return (
    <AutoSizer>
      {({ width, height }) => (
        <>
          <Header groupTables={tablesGroupedByType} width={width} />
          <Grid
            height={height}
            width={width}
            columnWidth={(width - SCROLLBAR_WIDTH) / 4}
            rowHeight={getGridRowHeight(5, width)}
            columnCount={4}
            rowCount={getMaxTables(tablesGroupedByType)}
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
        </>
      )}
    </AutoSizer>
  )
}
