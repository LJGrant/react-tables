import React from 'react'
import { Action, Item } from './Table'

export interface ActionsProps {
  actions: Action[]
  selectedItems: Item[]
}

const Actions: React.FC<ActionsProps> = ({ actions, selectedItems }) => {
  return (
    <>
      {actions?.map(({ label, action, classNames }, index) => (
        <button
          className={classNames?.join(' ')}
          onClick={() => action(selectedItems)}
          key={`action-${index}`}
        >
          {label}
        </button>
      ))}
    </>
  )
}

export default Actions
