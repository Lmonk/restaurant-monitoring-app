import { useMemo } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { TableComponent } from './table-component'
import { FixedSizeGrid as Grid } from 'react-window'
import { convertRemToPixels, getMaxRows, groupTablesByType } from '../utils'
import { useSelector } from 'react-redux'
import { tablesSelector } from '../redux/tableSlice'
import { TableType } from '../models'
import styled from 'styled-components'

const HeaderTitles = {
  [TableType.BOOTH_TABLE]: 'Booth',
  [TableType.DINING_TABLE]: 'Dining',
  [TableType.OUTDOOR_TABLE]: 'Outdoor',
  [TableType.PRIVATE_DINING_TABLE]: 'Private',
}

interface TableElementProps {
  columnIndex: number
  rowIndex: number
  style?: React.CSSProperties
}

interface HeaderProps {
  width: number
}

const Header = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'width',
})<HeaderProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: ${({ width }) => width - 17}px;
  margin-bottom: 1rem;
  font-size: 1.5rem;

  & < div {
    width: 25%;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`

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
          <Header width={width}>
            <div>{HeaderTitles[TableType.BOOTH_TABLE]}</div>
            <div>{HeaderTitles[TableType.DINING_TABLE]}</div>
            <div>{HeaderTitles[TableType.OUTDOOR_TABLE]}</div>
            <div>{HeaderTitles[TableType.PRIVATE_DINING_TABLE]}</div>
          </Header>
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
