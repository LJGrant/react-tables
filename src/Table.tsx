import './index.scss'

import React, { useContext, useEffect } from 'react'
import Actions from './Actions'
import SearchBar from './SearchBar'
import TableHead from './TableHead'
import { Item, Styles, Header, Action } from './lib'
import Row from './Row'
import TableContext from './context/TableContext'

export type TableProps = {
  styles?: Styles
  items: Item[]
  headers: Header[]
  actions?: Action[]
  search?: Boolean
  getSelected?: ({ ...args }: any) => any
}

const Table: React.FC<TableProps> = ({
  styles,
  items,
  headers,
  actions = [],
  search = false,
  getSelected,
}) => {
  const { filteredItems, selectedItems, initiateSetup, setMasterCheck } =
    useContext(TableContext)

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
          {filteredItems.map((item) => (
            <Row
              key={`item-${item.id}`}
              {...{
                item,
                styles,
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
