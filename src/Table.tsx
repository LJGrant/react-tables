import './index.scss'

import React, { useEffect, useMemo } from 'react'
import Action from './Action'
import SearchBar from './SearchBar'
import TableHead from './TableHead'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DraggableRow from './RowDraggable'
import useTable from './hooks/useTable'
import Row from './Row'

export type DragTableProps = {
  search?: Boolean
  draggable?: Boolean
}

const Table = ({ search = false, draggable = false }: DragTableProps) => {
  const {
    selectedItemsById,
    filteredItemsById,
    styles,
    actions,
    setMasterCheck,
    getFilteredItems,
  } = useTable()

  useEffect(() => {
    if (selectedItemsById.length === 0) {
      setMasterCheck('unchecked')
    }
  }, [])

  const filteredItems = useMemo(() => {
    return getFilteredItems()
  }, [filteredItemsById])

  return (
    <div className={styles?.tableContainer?.join(' ')}>
      <div className={styles?.searchBar?.join(' ')}>
        {search && <SearchBar />}
        {actions?.length > 0 && (
          <div className={styles?.buttonWrapper?.join(' ')}>
            {actions?.map((action, index) => (
              <Action key={`action-${index}`} {...{ action, index }} />
            ))}
          </div>
        )}
      </div>
      <table className={styles?.table?.join(' ')}>
        <TableHead />
        <tbody>
          {filteredItems.map(
            (item, index) =>
              item &&
              (draggable ? (
                <DraggableRow
                  key={`item-${item.id}`}
                  {...{
                    item,
                    styles,
                    index,
                  }}
                />
              ) : (
                <Row
                  key={`item-${item.id}`}
                  {...{
                    item,
                    styles,
                    index,
                  }}
                />
              ))
          )}
        </tbody>
      </table>
    </div>
  )
}

const App = (props: any) => (
  <DndProvider backend={HTML5Backend}>
    <Table {...props} />
  </DndProvider>
)

export default App
export { Item, BetterItem, FunctionalItem } from './lib'
