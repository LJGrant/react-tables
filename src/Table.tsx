import React, { ReactElement, useEffect, useState } from 'react'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import './styles.scss'

export interface Item {
  id: string | number
  label: string
}

type TableProps = {
  className?: string
  children: ReactElement
  items: Item[]
}

const Table: React.FC<TableProps> = ({ className, children, items }) => {
  const [masterCheck, setMasterCheck] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<Item[]>([])

  useEffect(() => {
    if (selectedItems.length === 0) {
      setMasterCheck(false)
    }
  }, [selectedItems])

  const onItemCheck = async (
    e: React.ChangeEvent<HTMLInputElement>,
    item: Item
  ) => {
    if (e.target.checked) {
      setSelectedItems((prevState) => [...prevState, item])
      setMasterCheck(true)
    } else {
      const newItems = selectedItems.filter(({ id }) => id !== item.id)
      setSelectedItems(newItems)
      if (newItems.length === 0) {
        setMasterCheck(false)
      }
    }
  }

  const onMasterCheck = () => {
    if (masterCheck) {
      setSelectedItems([])
      setMasterCheck(false)
    } else {
      setSelectedItems(items)
      setMasterCheck(true)
    }
  }

  const childrenWithProps = React.Children.map(children, (child) => {
    // taking each child and adding props to it
    return React.cloneElement(child, {
      masterCheck,
      onMasterCheck,
      selectedItems,
      setSelectedItems,
      onItemCheck,
    })
  })

  return <table className={`${className} table`}>{childrenWithProps}</table>
}

export default Object.assign(Table, {
  Body: TableBody,
  Header: TableHeader,
  Row: TableRow,
})
