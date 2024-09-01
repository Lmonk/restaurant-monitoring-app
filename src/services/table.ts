import { useCallback } from 'react'
import { Tables, TableType } from '../models'
import { v4 as uuidv4 } from 'uuid'

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

export function useFetchTables(tablesAmount: number) {
  return useCallback(() => {
    const result: Tables = {}

    for (let i = 0; i < tablesAmount; i++) {
      const id = uuidv4()
      const type = tableTypes[Math.floor(Math.random() * tableTypes.length)]
      const maxGuests = Math.floor(Math.random() * 8) + 2
      const guests = Math.floor(Math.random() * (maxGuests + 1))
      result[id] = {
        type,
        name: `${tableNames[type]} ${i}`,
        warning: false,
        guests,
        maxGuests,
      }
    }

    return result
  }, [tablesAmount])
}
