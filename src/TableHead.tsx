import React, { useState } from 'react'
import { Header, Item, Styles } from './Table'

export interface SortParam {
  slug: string
  direction: string
}

type TableHeadProps = {
  styles?: Styles
  masterCheck: boolean
  onMasterCheck: () => void
  headers: Header[]
  setSortedItems: Function
}

const TableHead: React.FC<TableHeadProps> = ({
  styles,
  masterCheck,
  onMasterCheck,
  headers,
  setSortedItems,
}) => {
  const [sortParam, setSortParam] = useState<SortParam>({
    slug: headers[0].slug,
    direction: '',
  })

  const sort = (slug: string) => {
    if (sortParam.slug === slug && sortParam.direction === 'asc') {
      // sorting by slug but in reverse
      setSortedItems((prevState: Item[]) => [
        ...prevState.sort((a, b) => {
          if (a[slug] > b[slug]) return -1
          if (a[slug] < b[slug]) return 1
          return 0
        }),
      ])
      setSortParam({
        slug,
        direction: 'desc',
      })
    } else if (sortParam.slug === slug && sortParam.direction === 'desc') {
      // talking sorting off slug and returning to sorting by init slug
      setSortedItems((prevState: Item[]) => [
        ...prevState.sort((a, b) => {
          if (a[headers[0].slug] < b[headers[0].slug]) return -1
          if (a[headers[0].slug] > b[headers[0].slug]) return 1
          return 0
        }),
      ])
      setSortParam({
        slug: headers[0].slug,
        direction: '',
      })
    } else {
      // sorting by slug in ascending order
      setSortedItems((prevState: Item[]) => [
        ...prevState.sort((a, b) => {
          if (a[slug] < b[slug]) return -1
          if (a[slug] > b[slug]) return 1
          return 0
        }),
      ])
      setSortParam({
        slug,
        direction: 'asc',
      })
    }
  }

  return (
    <thead>
      <tr className={styles?.tr?.join(' ')}>
        <th className={styles?.th?.join(' ')}>
          <input
            type="checkbox"
            checked={masterCheck}
            id="mastercheck"
            onChange={onMasterCheck}
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
            {sortParam.slug === header.slug && (
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
