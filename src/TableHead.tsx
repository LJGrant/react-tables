import React from 'react'
import useTable from './hooks/useTable'

const TableHead: React.FC = () => {
  const { styles, headers, masterCheck, sortParam, setMasterCheck, sort } =
    useTable()

  return (
    <thead>
      <tr className={styles?.tr?.join(' ')}>
        <th className={styles?.th?.join(' ')}>
          <input
            className={styles?.checkbox?.join(' ')}
            type="checkbox"
            checked={masterCheck === 'checked'}
            id="mastercheck"
            onChange={(e) => {
              setMasterCheck(e.target.checked ? 'checked' : 'unchecked')
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
