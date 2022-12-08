import './index.scss'

import React, { useEffect, useState } from 'react'
import Actions from './Actions'
import SearchBar from './SearchBar'
import TableHead from './TableHead'
import { Item, Styles, Header, Action } from './lib'
import Row from './Row'

export type TableProps = {
  styles?: Styles
  items: Item[]
  headers: Header[]
  actions?: Action[]
  search?: Boolean
  returnUpdate?: () => void
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
  const [sortedItems, setSortedItems] = useState<Item[]>(items)
  const [filteredItems, setFilteredItems] = useState<Item[]>(items)
  const [masterCheck, setMasterCheck] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<Item[]>([])

  useEffect(() => {
    if (selectedItems.length === 0) {
      setMasterCheck(false)
    }
    if (getSelected) {
      getSelected(selectedItems)
    }
  }, [selectedItems])

  useEffect(() => {
    setSortedItems(items)
    if (!search) {
      setFilteredItems(items)
    }
    setSelectedItems((prevState) => {
      return [
        ...prevState.filter((selectedItem) =>
          items.find((item) => item.id === selectedItem.id)
        ),
      ]
    })
  }, [items])

  const onItemCheck = async (
    e: React.ChangeEvent<HTMLInputElement>,
    item: Item
  ): Promise<void> => {
    if (e.target.checked) {
      setSelectedItems((prevState) => [...prevState, item])
      setMasterCheck(true)
    } else {
      const newItems = selectedItems.filter(({ id }) => id !== item.id)
      setSelectedItems(newItems)
      if (newItems.length === 0) {
        setMasterCheck(false)
      }
    }
  }

  const onMasterCheck = (): void => {
    if (masterCheck) {
      setSelectedItems([])
      setMasterCheck(false)
    } else {
      setSelectedItems(filteredItems)
      setMasterCheck(true)
    }
  }

  return (
    <div className={styles?.tableContainer?.join(' ')}>
      <div className={styles?.searchBar?.join(' ')}>
        {search && (
          <SearchBar
            {...{
              styles,
              setFilteredItems,
              sortedItems,
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
        <TableHead
          {...{ styles, masterCheck, onMasterCheck, headers, setSortedItems }}
        />
        <tbody>
          {filteredItems.map((item, index) => (
            <Row
              key={`item-${item.id}`}
              {...{
                item,
                styles,
                onItemCheck,
                headers,
                index,
                selectedItems,
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
