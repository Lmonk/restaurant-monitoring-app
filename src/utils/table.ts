import { TableKeysByType, Tables, TableType } from '../models'
import { v4 as uuidv4 } from 'uuid'

export const tableTypeColumnIds = {
  [TableType.BOOTH_TABLE]: 0,
  [TableType.DINING_TABLE]: 1,
  [TableType.OUTDOOR_TABLE]: 2,
  [TableType.PRIVATE_DINING_TABLE]: 3,
}

const tableTypes = [
  TableType.BOOTH_TABLE,
  TableType.DINING_TABLE,
  TableType.OUTDOOR_TABLE,
  TableType.PRIVATE_DINING_TABLE,
]

const tableNames = {
  [TableType.BOOTH_TABLE]: 'Booth',
  [TableType.DINING_TABLE]: 'Dining',
  [TableType.OUTDOOR_TABLE]: 'Outdoor',
  [TableType.PRIVATE_DINING_TABLE]: 'Private',
}

export function getMaxRows(groupedTables: TableKeysByType) {
  const longestType = Object.values(tableTypeColumnIds).reduce<string[]>(
    (acc, type) =>
      groupedTables[type].length > acc.length ? groupedTables[type] : acc,
    []
  )

  return longestType.length
}

export function groupTablesByType(tables: Tables) {
  return Object.keys(tables).reduce<TableKeysByType>(
    (acc, key) => {
      acc[tableTypeColumnIds[tables[key].type]].push(key)
      return acc
    },
    {
      [tableTypeColumnIds[TableType.BOOTH_TABLE]]: [],
      [tableTypeColumnIds[TableType.DINING_TABLE]]: [],
      [tableTypeColumnIds[TableType.OUTDOOR_TABLE]]: [],
      [tableTypeColumnIds[TableType.PRIVATE_DINING_TABLE]]: [],
    }
  )
}

export function getInitialTables(tablesAmount: number) {
  const result: Tables = {}

  for (let i = 0; i < tablesAmount; i++) {
    const id = uuidv4()
    const type = tableTypes[Math.floor(Math.random() * tableTypes.length)]
    const maxGuests = Math.floor(Math.random() * 9) + 2
    const guests = Math.floor(Math.random() * (maxGuests + 1))
    result[id] = {
      type,
      name: `${tableNames[type]} ${i + 1}`,
      warning: Math.random() < 0.1,
      guests,
      maxGuests,
    }
  }

  return result
}

export function getTablesUpdate(tableIds: string[], tables: Tables) {
  const result: Tables = {}
  const tablesTmp = { ...tables }
  tableIds.forEach((key) => {
    if (tablesTmp[key]) {
      result[key] = {
        ...tablesTmp[key],
        warning: !tablesTmp[key].warning,
        guests: Math.floor(Math.random() * (tablesTmp[key].maxGuests + 1)),
      }
    }
  })

  return result
}

export function getTableIdsToUpdate(tableIds: string[], tables: Tables) {
  // Filter tables with and without the warning property set to true
  const tablesWithWarning = tableIds.filter(
    (key) => tables[key].warning === true
  )
  const tablesWithoutWarning = tableIds.filter(
    (key) => tables[key].warning !== true
  )

  // Determine the number of tables to select (20% of total)
  const tenPercent = Math.ceil(tableIds.length * 0.2)
  const halfWithWarning = Math.floor(tenPercent / 2)

  // Select random tables with the warning property
  const selectedWithWarning = []
  for (let i = 0; i < halfWithWarning && tablesWithWarning.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * tablesWithWarning.length)
    selectedWithWarning.push(tablesWithWarning.splice(randomIndex, 1)[0])
  }

  // Select random tables without the warning property
  const selectedWithoutWarning = []
  for (
    let i = 0;
    i < tenPercent - selectedWithWarning.length &&
    tablesWithoutWarning.length > 0;
    i++
  ) {
    const randomIndex = Math.floor(Math.random() * tablesWithoutWarning.length)
    selectedWithoutWarning.push(tablesWithoutWarning.splice(randomIndex, 1)[0])
  }

  // Combine both selections
  return [...selectedWithWarning, ...selectedWithoutWarning]
}
