import React from 'react'
import { Styles } from './Table'

type SearchBarProps = {
  styles?: Styles
  searchParam: string
  setSearch: Function
}

const SearchBar: React.FC<SearchBarProps> = ({
  styles,
  searchParam,
  setSearch,
}) => {
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
