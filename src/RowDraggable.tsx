import React, { useRef } from 'react'
import { Item } from './lib'
import type { Identifier, XYCoord } from 'dnd-core'
import { useDrop, useDrag } from 'react-dnd'
import useTable from './hooks/useTable'

interface DragItem {
  index: number
  id: string
  type: string
}

type Props = {
  id: number | string
  item: Item
  index: number
}

const DraggableRow = ({ id, item, index }: Props) => {
  const { styles, headers, selectedItemsById, onItemCheck, inner, moveRow } =
    useTable(id)

  const ref = useRef<HTMLTableRowElement>(null)

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'one',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(dragitem: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = dragitem.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      dragitem.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'one',
    item: () => {
      const id = item.id
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <tr
      className={styles?.tr?.join(' ')}
      onClick={() => {}}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
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
          {inner(item[slug], item)}
        </td>
      ))}
    </tr>
  )
}

export default DraggableRow
