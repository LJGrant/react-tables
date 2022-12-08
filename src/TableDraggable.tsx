import './index.scss'

import React, { useContext, useEffect } from 'react'
import Actions from './Actions'
import SearchBar from './SearchBar'
import TableHead from './TableHead'
import { Item, Styles, Header, Action } from './lib'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DraggableRow from './RowDraggable'
import TableContext, { TableProvidor } from './context/TableContext'

export type DragTableProps = {
  styles?: Styles
  items: Item[]
  headers: Header[]
  actions?: Action[]
  search?: Boolean
  returnUpdate: (sortedItems: Item[]) => void
  getSelected?: ({ ...args }: any) => any
}

const Table = ({
  styles,
  items,
  headers,
  actions = [],
  search = false,
  returnUpdate,
  getSelected,
}: DragTableProps) => {
  const {
    sortedItems,
    filteredItems,
    selectedItems,
    initiateSetup,
    setMasterCheck,
  } = useContext(TableContext)

  useEffect(() => {
    if (selectedItems.length === 0 && setMasterCheck) {
      setMasterCheck(false)
    }
    if (getSelected) {
      getSelected(selectedItems)
    }
  }, [selectedItems])

  useEffect(() => {
    if (items && initiateSetup) {
      initiateSetup(items, headers, !!search)
    }
  }, [items, headers])

  useEffect(() => {
    returnUpdate(sortedItems)
    console.log('updated')
  }, [sortedItems])

  return (
    <div className={styles?.tableContainer?.join(' ')}>
      <div className={styles?.searchBar?.join(' ')}>
        {search && (
          <SearchBar
            {...{
              styles,
              headers,
            }}
          />
        )}
        {actions?.length > 0 && (
          <div className={styles?.buttonWrapper?.join(' ')}>
            <Actions {...{ actions, selectedItems }} />
          </div>
        )}
      </div>
      <table className={styles?.table?.join(' ')}>
        <TableHead {...{ styles, headers }} />
        <tbody>
          {filteredItems.map((item, index) => (
            <DraggableRow
              key={`item-${item.id}`}
              {...{
                item,
                styles,
                index,
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const DragTable = (props: any) => (
  <DndProvider backend={HTML5Backend}>
    <TableProvidor>
      <Table {...props} />
    </TableProvidor>
  </DndProvider>
)

export default DragTable
export { Item, BetterItem, FunctionalItem } from './lib'
