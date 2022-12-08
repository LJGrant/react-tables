import React from 'react'
import useTable from './hooks/useTable'

const SearchBar: React.FC = () => {
  const { styles, searchParam, setSearch } = useTable()

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
