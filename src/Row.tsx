import React from 'react'
import { Item, Styles, Header, isBetterItem, isFunctionalItem } from './lib'
function inner<T>(slugProp: T, item: Item) {
  if (isBetterItem(slugProp)) {
    return <>{slugProp.display}</>
  } else if (isFunctionalItem(slugProp)) {
    return slugProp.functionalDisplay(item)
  }
  return <>{slugProp}</>
}

type Props = {
  item: Item
  styles?: Styles
  selectedItems: Item[]
  headers: Header[]
  index: number
  onItemCheck: (e: React.ChangeEvent<HTMLInputElement>, item: Item) => void
}

const Row = ({ item, styles, selectedItems, headers, onItemCheck }: Props) => {
  return (
    <tr className={styles?.tr?.join(' ')} onClick={() => {}}>
      <td className={styles?.td?.join(' ')}>
        <input
          className={styles?.checkbox?.join(' ')}
          onClick={(e) => e.stopPropagation()}
          type="checkbox"
          checked={selectedItems.includes(item)}
          id={`rowcheck-${item.id}`}
          onChange={(e) => onItemCheck(e, item)}
        />
      </td>
      {headers.map(({ slug }) => (
        <td className={styles?.td?.join(' ')} key={`${slug}-${item.id}`}>
          {inner(item[slug], item)}
        </td>
      ))}
    </tr>
  )
}

export default Row
