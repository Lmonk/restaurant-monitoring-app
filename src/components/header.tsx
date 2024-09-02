import { tableTypeColumnIds as columnsByType } from '../utils'
import { TableKeysByType, TableType } from '../models'
import styled from 'styled-components'
import { SCROLLBAR_WIDTH } from '../App'

const HeaderTitles = {
  [TableType.BOOTH_TABLE]: 'Booth',
  [TableType.DINING_TABLE]: 'Dining',
  [TableType.OUTDOOR_TABLE]: 'Outdoor',
  [TableType.PRIVATE_DINING_TABLE]: 'Private',
}

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

  & < div {
    width: 25%;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`

function getHeaderItem(groupTables: TableKeysByType, type: TableType) {
  return (
    <div>
      {HeaderTitles[type]}: {groupTables[columnsByType[type]].length}
    </div>
  )
}

export const Header = ({ groupTables, width }: HeaderProps) => {
  return (
    <Wrapper width={width}>
      {getHeaderItem(groupTables, TableType.BOOTH_TABLE)}
      {getHeaderItem(groupTables, TableType.DINING_TABLE)}
      {getHeaderItem(groupTables, TableType.OUTDOOR_TABLE)}
      {getHeaderItem(groupTables, TableType.PRIVATE_DINING_TABLE)}
    </Wrapper>
  )
}
