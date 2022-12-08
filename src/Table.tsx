import './index.scss'

import React, { useEffect } from 'react'
import Action from './Action'
import SearchBar from './SearchBar'
import TableHead from './TableHead'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DraggableRow from './RowDraggable'
import { TableProvidor } from './context/TableContext'
import useTable from './hooks/useTable'
import Row from './Row'

export type DragTableProps = {
  search?: Boolean
  draggable?: Boolean
}

const Table = ({ search = false, draggable = false }: DragTableProps) => {
  const {
    selectedItemsById,
    styles,
    actions,
    setMasterCheck,
    getFilteredItems,
  } = useTable()

  useEffect(() => {
    if (selectedItemsById.length === 0) {
      setMasterCheck('unchecked')
    }
  }, [selectedItemsById])
  return (
    <div className={styles?.tableContainer?.join(' ')}>
      <div className={styles?.searchBar?.join(' ')}>
        {search && <SearchBar />}
        {actions?.length > 0 && (
          <div className={styles?.buttonWrapper?.join(' ')}>
            {actions?.map((action, index) => (
              <Action {...{ action, index }} />
            ))}
          </div>
        )}
      </div>
      <table className={styles?.table?.join(' ')}>
        <TableHead />
        <tbody>
          {getFilteredItems().map(
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
    <TableProvidor>
      <Table {...props} />
    </TableProvidor>
  </DndProvider>
)

export default App
export { Item, BetterItem, FunctionalItem } from './lib'
