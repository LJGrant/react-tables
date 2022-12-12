import React, { createContext, useState } from 'react'
import { Table, TableState } from '../lib'

type TableContextInterface = {
  tables: Table[]
  setTables?: React.Dispatch<React.SetStateAction<Table[]>>
  setTableState?: (
    id: number | string,
    initialState: (tableState: TableState) => TableState
  ) => void
}

const TableContext = createContext<TableContextInterface>({
  tables: [],
})

const TableProvidor = ({ children }: { children: React.ReactNode }) => {
  const [tables, setTables] = useState<Table[]>([])

  const setTableState = (
    id: number | string,
    mutation: (tableState: TableState) => TableState
  ) => {
    if (setTables) {
      setTables((prev) => {
        const table = prev.find((t) => t.id === id)
        if (!table) {
          return prev
        }
        return [
          ...prev.filter((t) => t.id != table.id),
          {
            ...table,
            state: mutation(table.state),
          },
        ]
      })
    }
  }

  return (
    <TableContext.Provider value={{ tables, setTables, setTableState }}>
      {children}
    </TableContext.Provider>
  )
}

export { TableProvidor, TableContext }
