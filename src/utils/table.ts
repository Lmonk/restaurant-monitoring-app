import { TableKeysByType, Tables, TableType } from '../models'

const tableTypeColumnIds = {
  [TableType.BOOTH_TABLE]: 0,
  [TableType.DINING_TABLE]: 1,
  [TableType.OUTDOOR_TABLE]: 2,
  [TableType.PRIVATE_DINING_TABLE]: 3,
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
