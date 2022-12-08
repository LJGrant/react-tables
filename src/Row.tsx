import React, { useContext } from 'react'
import TableContext from './context/TableContext'
import { Item, Styles } from './lib'

type Props = {
  item: Item
  styles?: Styles
}

const Row = ({ item, styles }: Props) => {
  const { headers, selectedItems, onItemCheck, inner } =
    useContext(TableContext)
  return (
    <tr className={styles?.tr?.join(' ')} onClick={() => {}}>
      <td className={styles?.td?.join(' ')}>
        <input
          className={styles?.checkbox?.join(' ')}
          onClick={(e) => e.stopPropagation()}
          type="checkbox"
          checked={selectedItems.includes(item)}
          id={`rowcheck-${item.id}`}
          onChange={(e) => onItemCheck && onItemCheck(e, item)}
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
