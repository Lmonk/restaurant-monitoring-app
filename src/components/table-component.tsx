import styled, { CSSProperties } from 'styled-components'
import {
  BoothTableIcon,
  DiningTableIcon,
  OutdoorTableIcon,
  PrivateDiningTableIcon,
} from '../assets/icons'
import { Table, TableType } from '../models'
import { GuestsComponent } from './guests-component'
import { getFillColor } from '../utils'

interface TableProps {
  table: Table
  style?: CSSProperties
}

interface TableIconProps {
  percentage: number
}

interface TableItemProps {
  warning: boolean
}

const tableIcons = {
  [TableType.BOOTH_TABLE]: <BoothTableIcon />,
  [TableType.DINING_TABLE]: <DiningTableIcon />,
  [TableType.OUTDOOR_TABLE]: <OutdoorTableIcon />,
  [TableType.PRIVATE_DINING_TABLE]: <PrivateDiningTableIcon />,
}

const TableIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'percentage',
})<TableIconProps>`
  width: 4rem;
  margin-right: 10px;

  svg {
    display: block;
    fill: ${({ percentage }) => getFillColor(percentage)};
  }

  @media (max-width: 768px) {
    width: 2rem;
  }
`

const TableItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'warning',
})<TableItemProps>`
  display: flex;
  flex-direction: row;
  border: 1px solid gray;
  border-radius: 0.5rem;
  margin: 5px;
  cursor: pointer;
  align-items: center;
  height: 4rem;

  ${(props) =>
    props.warning &&
    `
    -webkit-animation: input-shadow ease-in-out 1s infinite;
    animation: input-shadow ease-in-out 1s infinite;
  `}

  @media (max-width: 768px) {
    height: 3rem;
  }
`

const TableName = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
`

export const TableComponent = ({ table, style }: TableProps) => {
  return (
    <TableItem style={style} warning={table.warning}>
      <TableIcon percentage={(table.guests / table.maxGuests) * 100}>
        {tableIcons[table.type]}
      </TableIcon>
      <div>
        <TableName>{table.name}</TableName>
        <GuestsComponent guests={table.guests} maxGuests={table.maxGuests} />
      </div>
    </TableItem>
  )
}
