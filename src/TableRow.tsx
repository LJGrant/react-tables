import React, { ReactElement } from 'react'
import { Item } from './Table'

type RowProps = {
  children: ReactElement
  selectedItems: Item[]
  onItemCheck: Function
  item: Item
  editItem: Function
}

const TableRow: React.FC<RowProps> = ({
  children,
  selectedItems,
  onItemCheck,
  item,
  editItem,
}) => {
  return (
    <tr
      onClick={() => {
        editItem && editItem(item)
      }}
    >
      <td>
        <input
          onClick={(e) => e.stopPropagation()}
          type="checkbox"
          checked={selectedItems.includes(item)}
          id="rowcheck{item.id}"
          onChange={(e) => onItemCheck(e, item)}
        />
      </td>
      {children}
    </tr>
  )
}

export default TableRow
