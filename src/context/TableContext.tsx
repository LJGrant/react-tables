import React, { createContext, useState } from 'react'
import { Action, Header, Item, MasterCheck, SortParam, Styles } from '../lib'

type TableState = {
  items: Item[]
  sortedItemsById: (number | string)[]
  filteredItemsById: (number | string)[]
  selectedItemsById: (number | string)[]
  headers: Header[]
  masterCheck: MasterCheck
  searchParam?: string
  sortParam?: SortParam
  actions: Action[]
  styles?: Styles
}

type TableContextInterface = {
  state: TableState
  setState?: React.Dispatch<React.SetStateAction<TableState>>
}

const TableContext = createContext<TableContextInterface>({
  state: {
    items: [],
    sortedItemsById: [],
    filteredItemsById: [],
    selectedItemsById: [],
    headers: [],
    masterCheck: 'unchecked',
    actions: [],
  },
})

export const TableProvidor = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<TableState>({
    items: [],
    sortedItemsById: [],
    filteredItemsById: [],
    selectedItemsById: [],
    headers: [],
    masterCheck: 'unchecked',
    searchParam: undefined,
    sortParam: {
      slug: null,
      direction: '',
    },
    actions: [],
  })

  return (
    <TableContext.Provider value={{ state, setState }}>
      {children}
    </TableContext.Provider>
  )
}

export default TableContext
