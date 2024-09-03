import { TableKeysByType, Tables, TableType } from '../models'
import { v4 as uuidv4 } from 'uuid'

// Mapping table types to column IDs, where each table type is associated with a unique number
export const tableTypeColumnIds = {
  [TableType.BOOTH_TABLE]: 0,
  [TableType.DINING_TABLE]: 1,
  [TableType.OUTDOOR_TABLE]: 2,
  [TableType.PRIVATE_DINING_TABLE]: 3,
}

// Mapping table types to their display names
export const tableNames = {
  [TableType.BOOTH_TABLE]: 'Booth',
  [TableType.DINING_TABLE]: 'Dining',
  [TableType.OUTDOOR_TABLE]: 'Outdoor',
  [TableType.PRIVATE_DINING_TABLE]: 'Private',
}

// Function to find the maximum number of tables
export function getMaxTables(groupedTables: TableKeysByType) {
  // Find the type with the longest array of table keys
  const longestType = Object.values(tableTypeColumnIds).reduce<string[]>(
    (acc, type) =>
      groupedTables[type].length > acc.length ? groupedTables[type] : acc,
    []
  )

  // Return the length of the longest arra
  return longestType.length
}

// Function to group tables by their types
export function groupTablesByType(tables: Tables) {
  // Reduce the tables object into a grouped structure based on table types
  return Object.keys(tables).reduce<TableKeysByType>(
    (acc, key) => {
      // Push the table key into the appropriate array based on its type
      acc[tableTypeColumnIds[tables[key].type]].push(key)
      return acc
    },
    // Initialize the accumulator object with empty arrays for each table type
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

  // Loop through the number of tables to create
  for (let i = 0; i < tablesAmount; i++) {
    const id = uuidv4()
    // Randomly select a table type from the tableTypes array
    const tableTypes = Object.values(TableType)
    const type = tableTypes[Math.floor(Math.random() * tableTypes.length)]
    // Determine the maximum number of guests (between 2 and 10)
    const maxGuests = Math.floor(Math.random() * 9) + 2
    // Randomly select the number of current guests (between 0 and maxGuests)
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

  // Loop through each table ID in the array
  tableIds.forEach((key) => {
    if (tables[key]) {
      // Update the table in the result object:
      // - Copy all properties from the original table
      // - Toggle the warning property
      // - Set the guests property to a random number between 0 and maxGuests
      result[key] = {
        ...tables[key],
        warning: !tables[key].warning,
        guests: Math.floor(Math.random() * (tables[key].maxGuests + 1)),
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

  // Determine the number of tables to select (20% or 50% of total depending on size)
  const idsAmount = tableIds.length
  let percent = idsAmount >= 10 ? idsAmount * 0.2 : idsAmount * 0.5
  percent = Math.ceil(percent)
  const halfWithWarning = Math.floor(percent / 2)

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
    i < percent - selectedWithWarning.length && tablesWithoutWarning.length > 0;
    i++
  ) {
    const randomIndex = Math.floor(Math.random() * tablesWithoutWarning.length)
    selectedWithoutWarning.push(tablesWithoutWarning.splice(randomIndex, 1)[0])
  }

  // Combine both selections
  return [...selectedWithWarning, ...selectedWithoutWarning]
}
