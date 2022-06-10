import React, { ReactElement } from 'react'
import { Item } from './Table'

type BodyProps = {
  children: ReactElement
  selectedItems: Item[]
  onItemCheck: () => {}
}

const TableBody: React.FC<BodyProps> = ({
  children,
  selectedItems,
  onItemCheck,
}) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      selectedItems,
      onItemCheck,
    })
  })

  return <tbody>{childrenWithProps}</tbody>
}

export default TableBody
