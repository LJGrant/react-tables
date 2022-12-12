import React from 'react'
import useTable from './hooks/useTable'

const SearchBar = ({ id }: { id: number | string }) => {
  const { styles, searchParam, setSearch } = useTable(id)

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
