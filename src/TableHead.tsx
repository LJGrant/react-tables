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
      setSortedItems((prevState: Item[]) =>
        prevState.sort((a, b) => {
          if (a[slug] > b[slug]) return -1
          if (a[slug] < b[slug]) return 1
          return 0
        })
      )
      setSortParam({
        slug,
        direction: 'desc',
      })
    } else if (sortParam.slug === slug && sortParam.direction === 'desc') {
      setSortedItems((prevState: Item[]) =>
        prevState.sort((a, b) => {
          if (a[headers[0].slug] < b[headers[0].slug]) return -1
          if (a[headers[0].slug] > b[headers[0].slug]) return 1
          return 0
        })
      )
      setSortParam({
        slug: headers[0].slug,
        direction: '',
      })
    } else {
      setSortedItems((prevState: Item[]) =>
        prevState.sort((a, b) => {
          if (a[slug] < b[slug]) return -1
          if (a[slug] > b[slug]) return 1
          return 0
        })
      )
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
            className={styles?.th?.join(' ')}
            onClick={() => sort(header.slug)}
          >
            {header.label}
            {sortParam.slug === header.slug && (
              <>
                {sortParam.direction === 'desc' ? (
                  <>&#x25B2;</>
                ) : (
                  sortParam.direction === 'asc' && <>&#x25BC;</>
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
