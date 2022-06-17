import React, { useEffect, useState } from 'react'
import { Header, Item, Styles } from './Table'

type SearchBarProps = {
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
          keys.some((key) =>
            item[key].toString().toLowerCase().includes(search)
          )
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
      />
    </div>
  )
}

export default SearchBar
