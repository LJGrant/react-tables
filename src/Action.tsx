import React from 'react'
import useTable from './hooks/useTable'
import { Action } from './lib'

type ActionProps = {
  id: number | string
  action: Action
  index: number
}

const Action = ({ id, action, index }: ActionProps) => {
  const { getSelectedItems } = useTable(id)

  const { classNames, label, action: func } = action

  return (
    <>
      <button
        className={classNames?.join(' ')}
        onClick={() => func(getSelectedItems())}
        key={`action-${index}`}
        type="button"
      >
        {label}
      </button>
    </>
  )
}

export default Action
