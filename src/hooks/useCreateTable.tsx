import { useContext, useEffect } from 'react'
import { TableContext } from '../context/TableContext'
import {
  Action,
  Header,
  isBetterItem,
  Item,
  MasterCheck,
  Styles,
  Table,
  TableState,
} from '../lib'
import useTable from './useTable'

const initState = {
  state: {
    items: [] as Item[],
    filteredItemsById: [] as (number | string)[],
    selectedItemsById: [] as (number | string)[],
    headers: [] as Header[],
    masterCheck: 'unchecked' as MasterCheck,
    searchParam: '',
    sortParam: {
      slug: null,
      direction: '',
    },
    actions: [] as Action[],
    styles: [] as Styles,
  },
}

const useCreateTable = (id: number | string) => {
  const { tables, setTables, setTableState } = useContext(TableContext)

  if (!setTables || !setTableState) {
    throw new Error('Context has not been initiated')
  }

  const createTable = (id: number | string) => {
    const table = tables.find((table) => table.id === id)
    if (table) {
      return table
    } else {
      const table = {
        id,
        state: initState.state,
      } as Table
      setTables((prev) => [...prev, table])
      return table
    }
  }
  const { state } = tables.find((table) => table.id === id) ?? initState

  const setState = (mutation: (tableState: TableState) => TableState) => {
    setTableState(id, mutation)
  }

  useEffect(() => {
    const table = tables.find((table) => table.id === id)
    if (!table) {
      createTable(id)
    }
  }, [])

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

  const destroyTable = () => {
    setTables((prev) => prev.filter((table) => table.id != id))
  }

  return { ...useTable(id), destroyTable }
}

export default useCreateTable
