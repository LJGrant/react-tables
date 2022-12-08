import React, { useContext, useEffect, useState } from 'react'
import TableContext from './context/TableContext'
import { Header, isBetterItem, Styles } from './lib'

interface SearchBarProps {
  styles?: Styles
  headers: Header[]
}

const SearchBar: React.FC<SearchBarProps> = ({ styles, headers }) => {
  const { sortedItems, setFilteredItems } = useContext(TableContext)

  const [searchParam, setSearch] = useState('')

  useEffect(() => {
    if (searchParam !== '' && setFilteredItems) {
      const search = searchParam.toLowerCase()
      const keys = headers
        .filter((header) => header.searchable !== false)
        .map(({ slug }) => slug)
      setFilteredItems(
        sortedItems.filter((item) =>
          keys.some((key) => {
            const itemKey = item[key]
            if (isBetterItem(itemKey)) {
              return itemKey.value?.toString().toLowerCase().includes(search)
            }
            return itemKey.toString().toLowerCase().includes(search)
          })
        )
      )
    } else if (setFilteredItems) {
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
