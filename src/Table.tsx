import React, { useEffect, useState } from 'react'

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

type TableProps = {
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
  const [sortedItems, setSortedItems] = useState(items)
  const [masterCheck, setMasterCheck] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<Item[]>([])
  const [searchParam, setSearch] = useState('')
  const [sortParam, setSortParam] = useState({
    slug: headers[0].slug,
    direction: '',
  })

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
      setSelectedItems(items)
      setMasterCheck(true)
    }
  }

  const sort = (slug: string) => {
    if (sortParam.slug === slug && sortParam.direction === 'asc') {
      setSortedItems((prevState) =>
        prevState.sort((a, b) => {
          if (a[slug] > b[slug]) return -1
          if (a[slug] < b[slug]) return 1
          return 0
        })
      )
      setSortParam({
        slug,
        direction: 'desc',
      })
    } else if (sortParam.slug === slug && sortParam.direction === 'desc') {
      setSortedItems((prevState) =>
        prevState.sort((a, b) => {
          if (a[headers[0].slug] < b[headers[0].slug]) return -1
          if (a[headers[0].slug] > b[headers[0].slug]) return 1
          return 0
        })
      )
      setSortParam({
        slug: headers[0].slug,
        direction: '',
      })
    } else {
      setSortedItems((prevState) =>
        prevState.sort((a, b) => {
          if (a[slug] < b[slug]) return -1
          if (a[slug] > b[slug]) return 1
          return 0
        })
      )
      setSortParam({
        slug,
        direction: 'asc',
      })
    }
  }

  return (
    <div className={styles?.tableContainer?.join(' ')}>
      <div className={styles?.searchBar?.join(' ')}>
        {search && (
          <input
            className="search-input"
            value={searchParam}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
        )}
        {actions?.length > 0 &&
          actions?.map(({ label, action, classNames }, index) => (
            <button
              className={classNames?.join(' ')}
              onClick={() => action(selectedItems)}
              key={`action-${index}`}
            >
              {label}
            </button>
          ))}
      </div>
      <table className={styles?.table?.join(' ')}>
        <thead>
          <tr className={styles?.tr?.join(' ')}>
            <th className={styles?.th?.join(' ')}>
              <input
                type="checkbox"
                checked={masterCheck}
                id="mastercheck"
                onChange={onMasterCheck}
              />
            </th>
            {headers.map((header, index) => (
              <th
                key={`header-${index}`}
                className={styles?.th?.join(' ')}
                onClick={() => sort(header.slug)}
              >
                {header.label}
                {sortParam.slug === header.slug && (
                  <>
                    {sortParam.direction === 'desc' ? (
                      <>&#x25B2;</>
                    ) : (
                      sortParam.direction === 'asc' && <>&#x25BC;</>
                    )}
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, index) => (
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
                  id="rowcheck{item.id}"
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
