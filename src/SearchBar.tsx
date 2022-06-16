import React, { ReactElement, useState } from 'react'

type SearchBarProps = {
  className?: string
  children: ReactElement
}

const SearchBar: React.FC<SearchBarProps> = ({ className, children }) => {
  const [search, setSearch] = useState('')

  return (
    <tr className={className}>
      <th colSpan={5}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
        {children}
      </th>
    </tr>
  )
}

export default SearchBar
