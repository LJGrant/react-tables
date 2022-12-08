import React, { createContext, useCallback, useState } from 'react'
import { Header, isBetterItem, isFunctionalItem, Item, SortParam } from '../lib'
import update from 'immutability-helper'

type TableContextInterface = {
  sortedItems: Item[]
  filteredItems: Item[]
  selectedItems: Item[]
  headers: Header[]
  masterCheck: Boolean
  sortParam?: SortParam
  initiateSetup?: (items: Item[], headers: Header[], search: boolean) => void
  onItemCheck?: (e: React.ChangeEvent<HTMLInputElement>, item: Item) => void
  onMasterCheck?: () => void
  moveRow?: (dragIndex: number, hoverIndex: number) => void
  setMasterCheck?: React.Dispatch<React.SetStateAction<Boolean>>
  setFilteredItems?: React.Dispatch<React.SetStateAction<Item[]>>
  setSortedItems?: React.Dispatch<React.SetStateAction<Item[]>>
  setSortParam?: React.Dispatch<React.SetStateAction<SortParam>>
  sort?: (slug: string) => void
  inner?: <T>(slugProp: T, item: Item) => React.ReactNode
}

const TableContext = createContext<TableContextInterface>({
  sortedItems: [],
  filteredItems: [],
  selectedItems: [],
  headers: [],
  masterCheck: false,
})

export const TableProvidor = ({ children }: { children: React.ReactNode }) => {
  const [sortedItems, setSortedItems] = useState<Item[]>([])
  const [filteredItems, setFilteredItems] = useState<Item[]>([])
  const [masterCheck, setMasterCheck] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<Item[]>([])
  const [sortParam, setSortParam] = useState<SortParam>({
    slug: 'id',
    direction: '',
  })
  const [headers, setHeaders] = useState<Header[]>([])

  const initiateSetup = (items: Item[], headers: Header[], search: boolean) => {
    setSortedItems(items)
    setHeaders(headers)
    if (!search) {
      setFilteredItems(items)
    }
    setSelectedItems((prevState) => {
      return [
        ...prevState.filter((selectedItem) =>
          items.find((item) => item.id === selectedItem.id)
        ),
      ]
    })
  }

  const onItemCheck = async (
    e: React.ChangeEvent<HTMLInputElement>,
    item: Item
  ): Promise<void> => {
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

  const onMasterCheck = (): void => {
    if (masterCheck) {
      setSelectedItems([])
      setMasterCheck(false)
    } else {
      setSelectedItems(filteredItems)
      setMasterCheck(true)
    }
  }

  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    setSortedItems((prevItems: Item[]) =>
      update(prevItems, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevItems[dragIndex] as Item],
        ],
      })
    )
    setSortParam({
      slug: null,
      direction: '',
    })
  }, [])

  function compare<T>(a: T, b: T, x: number): number {
    if (isBetterItem(a) && isBetterItem(b)) {
      if (a.value && b.value) {
        if (a.value > b.value) return -x
        if (a.value < b.value) return x
        return 0
      } else {
        return 0
      }
    } else {
      if (a > b) return -x
      if (a < b) return x
      return 0
    }
  }

  const sort = (slug: string): void => {
    if (setSortedItems) {
      if (sortParam.slug === slug && sortParam.direction === 'asc') {
        // sorting by slug but in reverse
        setSortedItems((prevState: Item[]) => [
          ...prevState.sort((a, b) => compare(a[slug], b[slug], 1)),
        ])
        setSortParam({
          slug,
          direction: 'desc',
        })
      } else if (sortParam.slug === slug && sortParam.direction === 'desc') {
        // talking sorting off slug and returning to sorting by init slug
        setSortedItems((prevState: Item[]) => [
          ...prevState.sort((a, b) =>
            compare(a[headers[0].slug], b[headers[0].slug], -1)
          ),
        ])
        setSortParam({
          slug: headers[0].slug,
          direction: '',
        })
      } else {
        // sorting by slug in ascending order
        setSortedItems((prevState: Item[]) => [
          ...prevState.sort((a, b) => compare(a[slug], b[slug], -1)),
        ])
        setSortParam({
          slug,
          direction: 'asc',
        })
      }
    }
  }

  function inner<T>(slugProp: T, item: Item) {
    if (isBetterItem(slugProp)) {
      return <>{slugProp.display}</>
    } else if (isFunctionalItem(slugProp)) {
      return slugProp.functionalDisplay(item)
    }
    return <>{slugProp}</>
  }

  return (
    <TableContext.Provider
      value={{
        sortedItems,
        filteredItems,
        selectedItems,
        headers,
        masterCheck,
        sortParam,
        initiateSetup,
        onItemCheck,
        onMasterCheck,
        moveRow,
        setMasterCheck,
        setFilteredItems,
        setSortedItems,
        setSortParam,
        sort,
        inner,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

export default TableContext
