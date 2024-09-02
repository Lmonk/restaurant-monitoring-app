import { tableTypeColumnIds as columnsByType } from '../utils'
import { TableKeysByType, TableType } from '../models'
import styled from 'styled-components'

const HeaderTitles = {
  [TableType.BOOTH_TABLE]: 'Booth',
  [TableType.DINING_TABLE]: 'Dining',
  [TableType.OUTDOOR_TABLE]: 'Outdoor',
  [TableType.PRIVATE_DINING_TABLE]: 'Private',
}

interface HeaderProps {
  groupedTables: TableKeysByType
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

export const Header = ({ groupedTables, width }: HeaderProps) => {
  return (
    <Wrapper width={width}>
      <div>
        {HeaderTitles[TableType.BOOTH_TABLE]}:{' '}
        {groupedTables[columnsByType[TableType.BOOTH_TABLE]].length}
      </div>
      <div>
        {HeaderTitles[TableType.DINING_TABLE]}:{' '}
        {groupedTables[columnsByType[TableType.DINING_TABLE]].length}
      </div>
      <div>
        {HeaderTitles[TableType.OUTDOOR_TABLE]}:{' '}
        {groupedTables[columnsByType[TableType.OUTDOOR_TABLE]].length}
      </div>
      <div>
        {HeaderTitles[TableType.PRIVATE_DINING_TABLE]}:{' '}
        {groupedTables[columnsByType[TableType.PRIVATE_DINING_TABLE]].length}
      </div>
    </Wrapper>
  )
}
