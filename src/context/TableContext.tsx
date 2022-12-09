import React, { createContext, useEffect, useState } from 'react'
import {
  Action,
  Header,
  isBetterItem,
  Item,
  MasterCheck,
  SortParam,
  Styles,
} from '../lib'

type TableState = {
  items: Item[]
  filteredItemsById: (number | string)[]
  selectedItemsById: (number | string)[]
  headers: Header[]
  masterCheck: MasterCheck
  searchParam: string
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
    filteredItemsById: [],
    selectedItemsById: [],
    headers: [],
    masterCheck: 'unchecked',
    actions: [],
    searchParam: '',
  },
})

const TableProvidor = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<TableState>({
    items: [],
    filteredItemsById: [],
    selectedItemsById: [],
    headers: [],
    masterCheck: 'unchecked',
    searchParam: '',
    sortParam: {
      slug: null,
      direction: '',
    },
    actions: [],
  })

  useEffect(() => {
    if (state.searchParam !== '') {
      const search = state.searchParam.toLowerCase()
      const keys = state.headers
        .filter((header) => header.searchable !== false)
        .map(({ slug }) => slug)
      const filteredItemsById = state.items
        .reduce((result, { id }) => {
          const item = state.items.find((item) => id === item.id)
          if (item) {
            return [...result, item]
          }
          return result
        }, [] as Item[])
        .filter((item) =>
          keys.some((key) => {
            const itemKey = item[key]
            if (isBetterItem(itemKey)) {
              return itemKey.value?.toString().toLowerCase().includes(search)
            }
            return itemKey.toString().toLowerCase().includes(search)
          })
        )
        .map((item) => item.id)

      setState((prev) => {
        return {
          ...prev,
          filteredItemsById,
        }
      })
    } else {
      let masterCheck = state.masterCheck
      if (state.selectedItemsById.length === 0) {
        masterCheck = 'unchecked'
      } else if (state.selectedItemsById.length === state.items.length) {
        masterCheck = 'checked'
      } else {
        masterCheck = 'indeterminate'
      }
      setState((prev) => {
        return {
          ...prev,
          filteredItemsById: state.items.map((item) => item.id),
          masterCheck,
        }
      })
    }
  }, [state.items, state.searchParam])

  return (
    <TableContext.Provider value={{ state, setState }}>
      {children}
    </TableContext.Provider>
  )
}

export { TableProvidor, TableContext }
