import React, { useState } from 'react'
import { Header, isBetterItem, Item, Styles, SortParam } from './lib'

interface TableHeadProps {
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

  function compare<T>(a: T, b: T, x: number): number {
    if (isBetterItem(a) && isBetterItem(b)) {
      if (a.value && b.value) {
        if (a.value > b.value) return -x
        if (a.value < b.value) return x
        return 0
      } else {
        return 0
      }
    } else {
      if (a > b) return -x
      if (a < b) return x
      return 0
    }
  }

  const sort = (slug: string): void => {
    if (sortParam.slug === slug && sortParam.direction === 'asc') {
      // sorting by slug but in reverse
      setSortedItems((prevState: Item[]) => [
        ...prevState.sort((a, b) => compare(a[slug], b[slug], 1)),
      ])
      setSortParam({
        slug,
        direction: 'desc',
      })
    } else if (sortParam.slug === slug && sortParam.direction === 'desc') {
      // talking sorting off slug and returning to sorting by init slug
      setSortedItems((prevState: Item[]) => [
        ...prevState.sort((a, b) =>
          compare(a[headers[0].slug], b[headers[0].slug], -1)
        ),
      ])
      setSortParam({
        slug: 'id',
        direction: '',
      })
    } else {
      // sorting by slug in ascending order
      setSortedItems((prevState: Item[]) => [
        ...prevState.sort((a, b) => compare(a[slug], b[slug], -1)),
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
            className={styles?.checkbox?.join(' ')}
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
