import React, { useEffect, useRef } from 'react'
import useTable from './hooks/useTable'

const TableHead: React.FC = () => {
  const { styles, headers, masterCheck, sortParam, setMasterCheck, sort } =
    useTable()

  const checkboxRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (checkboxRef.current) {
      if (masterCheck === 'indeterminate') {
        checkboxRef.current.indeterminate = true
        checkboxRef.current.checked = false
      } else if (masterCheck === 'checked') {
        checkboxRef.current.indeterminate = false
        checkboxRef.current.checked = true
      } else {
        checkboxRef.current.indeterminate = false
        checkboxRef.current.checked = false
      }
    }
  }, [masterCheck])

  return (
    <thead>
      <tr className={styles?.tr?.join(' ')}>
        <th className={styles?.th?.join(' ')}>
          <input
            ref={checkboxRef}
            className={styles?.checkbox?.join(' ')}
            type="checkbox"
            id="mastercheck"
            onChange={() => {
              setMasterCheck(
                masterCheck === 'unchecked' ? 'checked' : 'unchecked'
              )
            }}
          />
        </th>
        {headers.map((header, index) => (
          <th
            key={`header-${index}`}
            className={`${styles?.th ? styles.th.join(' ') : ''} ${
              header.sortable !== false ? 'sortable' : ''
            }`}
            onClick={() => {
              header.sortable !== false && sort(header.slug)
            }}
          >
            {header.label}
            {sortParam && sortParam.slug === header.slug && (
              <>
                {sortParam.direction === 'desc' ? (
                  <span className={styles?.indicator?.join(' ')}>&#x25B2;</span>
                ) : (
                  sortParam.direction === 'asc' && (
                    <span className={styles?.indicator?.join(' ')}>
                      &#x25BC;
                    </span>
                  )
                )}
              </>
            )}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHead
