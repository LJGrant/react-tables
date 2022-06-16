import React, { useEffect, useState } from 'react'
import Actions from './Actions'
import SearchBar from './SearchBar'
import TableHead from './TableHead'

export interface Item {
  id: string | number
}

export interface Header {
  label: string
  slug: string
}

export interface DisplayProps {
  action: Function
}

export interface Action {
  action: Function
  label: string
  classNames: string[]
}

export interface Styles {
  tableContainer?: string[]
  searchBar?: string[]
  table?: string[]
  thead?: string[]
  tbody?: string[]
  tr?: string[]
  th?: string[]
  td?: string[]
}

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
  ) => {
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

  const onMasterCheck = () => {
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
        {actions?.length > 0 && <Actions {...{ actions, selectedItems }} />}
      </div>
      <table className={styles?.table?.join(' ')}>
        <TableHead
          {...{ styles, masterCheck, onMasterCheck, headers, setSortedItems }}
        />
        <tbody>
          {filteredItems.map((item, index) => (
            <tr
              className={styles?.tr?.join(' ')}
              onClick={() => {}}
              key={`item-${index}`}
            >
              <td className={styles?.td?.join(' ')}>
                <input
                  onClick={(e) => e.stopPropagation()}
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  id={`rowcheck-${index}`}
                  onChange={(e) => onItemCheck(e, item)}
                />
              </td>
              {headers.map(({ slug }, tindex) => (
                <td
                  className={styles?.td?.join(' ')}
                  key={`item-${index}-${tindex}`}
                >
                  {item[slug]}
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
