import React from 'react'
import useTable from './hooks/useTable'
import { Action } from './lib'

type ActionProps = {
  action: Action
  index: number
}

const Action: React.FC<ActionProps> = ({ action, index }) => {
  const { getSelectedItems } = useTable()

  const { classNames, label, action: func } = action

  const buttonAction = () => {
    func(getSelectedItems())
  }

  return (
    <>
      <button
        className={classNames?.join(' ')}
        onClick={buttonAction}
        key={`action-${index}`}
        type="button"
      >
        {label}
      </button>
    </>
  )
}

export default Action
