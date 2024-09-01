export enum TableType {
  DINING_TABLE = 'dining_table',
  BOOTH_TABLE = 'booth_table',
  OUTDOOR_TABLE = 'outdoor_table',
  PRIVATE_DINING_TABLE = 'private_dining_table',
}

export interface Table {
  type: TableType
  name: string
  warning: boolean
  guests: number
  maxGuests: number
}

export interface Tables {
  [key: string]: Table
}

export interface TableKeysByType {
  [key: number]: string[]
}
