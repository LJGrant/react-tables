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
      const keys = headers.map(({ slug }) => slug)
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
    <input
      className={styles?.searchBar?.join(' ')}
      value={searchParam}
      onChange={(e) => {
        setSearch(e.target.value)
      }}
    />
  )
}

export default SearchBar
