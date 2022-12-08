import React from 'react'
import useTable from './hooks/useTable'
import { Item, Styles } from './lib'

type Props = {
  item: Item
  styles?: Styles
}

const Row = ({ item, styles }: Props) => {
  const { headers, selectedItemsById, onItemCheck, inner } = useTable()
  return (
    <tr className={styles?.tr?.join(' ')} onClick={() => {}}>
      <td className={styles?.td?.join(' ')}>
        <input
          className={styles?.checkbox?.join(' ')}
          onClick={(e) => e.stopPropagation()}
          type="checkbox"
          checked={selectedItemsById.includes(item.id)}
          id={`rowcheck-${item.id}`}
          onChange={(e) => onItemCheck(e, item.id)}
        />
      </td>
      {headers.map(({ slug }) => (
        <td className={styles?.td?.join(' ')} key={`${slug}-${item.id}`}>
          {inner && inner(item[slug], item)}
        </td>
      ))}
    </tr>
  )
}

export default Row
