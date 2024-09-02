import { tableTypeColumnIds as columnsByType, tableNames } from '../utils'
import { TableKeysByType, TableType } from '../models'
import styled from 'styled-components'
import { SCROLLBAR_WIDTH } from '../App'

const orderedTableTypes = [
  TableType.BOOTH_TABLE,
  TableType.DINING_TABLE,
  TableType.OUTDOOR_TABLE,
  TableType.PRIVATE_DINING_TABLE,
]

interface HeaderProps {
  groupTables: TableKeysByType
  width: number
}

interface WrapperProps {
  width: number
}

const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'width',
})<WrapperProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: ${({ width }) => width - SCROLLBAR_WIDTH}px;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: gray;
  font-weight: 700;

  & > div {
    width: 25%;
    padding: 0 0.5rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`

function getHeaderItem(groupTables: TableKeysByType, type: TableType) {
  return (
    <div>
      {tableNames[type]}: {groupTables[columnsByType[type]].length}
    </div>
  )
}

export const Header = ({ groupTables, width }: HeaderProps) => {
  return (
    <Wrapper width={width}>
      {orderedTableTypes.map((type) => getHeaderItem(groupTables, type))}
    </Wrapper>
  )
}
