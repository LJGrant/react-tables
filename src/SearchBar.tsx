import React, { useEffect, useState } from 'react'
import { Header, isBetterItem, Item, Styles } from './lib'

interface SearchBarProps {
  styles?: Styles
  setFilteredItems: Function
  sortedItems: Item[]
  headers: Header[]
}

const SearchBar: React.FC<SearchBarProps> = ({
  styles,
  setFilteredItems,
  sortedItems,
  headers,
}) => {
  const [searchParam, setSearch] = useState('')

  useEffect(() => {
    if (searchParam !== '') {
      const search = searchParam.toLowerCase()
      const keys = headers
        .filter((header) => header.searchable !== false)
        .map(({ slug }) => slug)
      setFilteredItems(
        sortedItems.filter((item) =>
          keys.some((key) => {
            const itemKey = item[key]
            if (isBetterItem(itemKey)) {
              return itemKey.value.toString().toLowerCase().includes(search)
            }
            return itemKey.toString().toLowerCase().includes(search)
          })
        )
      )
    } else {
      setFilteredItems(sortedItems)
    }
  }, [searchParam, sortedItems])

  return (
    <div className={styles?.searchInputWrapper?.join(' ')}>
      <input
        className={styles?.searchInput?.join(' ')}
        value={searchParam}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        placeholder="Search"
      />
    </div>
  )
}

export default SearchBar
