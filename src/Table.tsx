import React, { useEffect, useState } from 'react'
import Actions from './Actions'
import SearchBar from './SearchBar'
import TableHead from './TableHead'
import {
  Item,
  Styles,
  Header,
  Action,
  isBetterItem,
  isFunctionalItem,
} from './lib'

export interface TableProps {
  styles?: Styles
  items: Item[]
  headers: Header[]
  actions?: Action[]
  search?: Boolean
}

const Table: React.FC<TableProps> = ({
  styles,
  items,
  headers,
  actions = [],
  search = false,
}) => {
  const [sortedItems, setSortedItems] = useState<Item[]>(items)
  const [filteredItems, setFilteredItems] = useState<Item[]>(items)
  const [masterCheck, setMasterCheck] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<Item[]>([])

  useEffect(() => {
    if (selectedItems.length === 0) {
      setMasterCheck(false)
    }
  }, [selectedItems])

  useEffect(() => {
    setSortedItems(items)
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

  function inner<T>(slugProp: T, item: Item) {
    if (isBetterItem(slugProp)) {
      return <>{slugProp.display}</>
    } else if (isFunctionalItem(slugProp)) {
      return slugProp.display(item)
    }
    return <>{slugProp}</>
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
          {filteredItems.map((item) => (
            <tr
              className={styles?.tr?.join(' ')}
              onClick={() => {}}
              key={`item-${item.id}`}
            >
              <td className={styles?.td?.join(' ')}>
                <input
                  className={styles?.checkbox?.join(' ')}
                  onClick={(e) => e.stopPropagation()}
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  id={`rowcheck-${item.id}`}
                  onChange={(e) => onItemCheck(e, item)}
                />
              </td>
              {headers.map(({ slug }) => (
                <td
                  className={styles?.td?.join(' ')}
                  key={`${slug}-${item.id}`}
                >
                  {inner(item[slug], item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
