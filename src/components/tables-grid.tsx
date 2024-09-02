import { useMemo } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { TableComponent } from './table-component'
import { FixedSizeGrid as Grid } from 'react-window'
import { convertRemToPixels, getMaxRows, groupTablesByType } from '../utils'
import { useSelector } from 'react-redux'
import { tablesSelector } from '../redux/tableSlice'
import { Header } from './header'

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
        <div>
          <Header groupedTables={tablesGroupedByType} width={width} />
          <Grid
            height={height}
            width={width}
            columnWidth={(width - 17) / 4}
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
        </div>
      )}
    </AutoSizer>
  )
}
