import styled from 'styled-components'
import {
  BoothTableIcon,
  DiningTableIcon,
  OutdoorTableIcon,
  PrivateDiningTableIcon,
} from '../assets/icons'
import { Table, TableType } from '../models'
import { GuestsComponent } from './guests-component'
import { getBusyColor } from '../utils'
import { useMemo } from 'react'

interface TableProps {
  table: Table
}

interface TableIconProps {
  color: string
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
  shouldForwardProp: (prop) => prop !== 'color',
})<TableIconProps>`
  width: 4rem;
  margin-right: 0.5rem;

  svg {
    display: block;
    fill: ${({ color }) => color};
  }

  @media (max-width: 768px) {
    width: 2rem;
  }

  @media (max-width: 991px) {
    margin-right: 0.25rem;
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
  display: block;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  @media (max-width: 600px) {
    display: none;
  }
`

const ShortTableName = styled.div`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  font-weight: 500;
  display: none;

  @media (max-width: 600px) {
    display: block;
  }
`

const extractNumber = (input: string): number | null => {
  const match = input.match(/\d+/)
  return match ? parseInt(match[0], 10) : null
}

export const TableComponent = ({ table }: TableProps) => {
  const percentage = useMemo(
    () => (table.guests / table.maxGuests) * 100,
    [table.guests, table.maxGuests]
  )

  const color = useMemo(() => getBusyColor(percentage), [percentage])

  return (
    <TableItem warning={table.warning}>
      <TableIcon color={color}>{tableIcons[table.type]}</TableIcon>
      <div>
        <TableName>{table.name}</TableName>
        <ShortTableName>{extractNumber(table.name)}</ShortTableName>
        <GuestsComponent
          guests={table.guests}
          maxGuests={table.maxGuests}
          color={color}
        />
      </div>
    </TableItem>
  )
}
