import React, { useContext, useEffect } from 'react'
import TableContext from '../context/TableContext'
import {
  Action,
  Header,
  isBetterItem,
  isFunctionalItem,
  Item,
  MasterCheck,
  Styles,
} from '../lib'

const useTable = () => {
  const { state, setState } = useContext(TableContext)
  const {
    items,
    sortedItemsById,
    filteredItemsById,
    selectedItemsById,
    headers,
    sortParam,
    searchParam,
  } = state

  if (setState === undefined) {
    throw new Error('setState is not defined')
  }

  useEffect(() => {
    if (searchParam && searchParam !== '') {
      const search = searchParam.toLowerCase()
      const keys = headers
        .filter((header) => header.searchable !== false)
        .map(({ slug }) => slug)
      const filteredItemsById = getSortedItems()
        .filter((item) =>
          keys.some((key) => {
            const itemKey = item[key]
            if (isBetterItem(itemKey)) {
              return itemKey.value?.toString().toLowerCase().includes(search)
            }
            return itemKey.toString().toLowerCase().includes(search)
          })
        )
        .map((item) => item.id)
      setState((prev) => {
        return {
          ...prev,
          filteredItemsById,
        }
      })
    }
  }, [searchParam])

  const setItems = (items: Item[]) => {
    setState((prev) => {
      return {
        ...prev,
        items,
      }
    })
  }

  const setSearch = (str: string) => {
    setState((prev) => {
      return {
        ...prev,
        searchParam: str,
      }
    })
  }

  const setHeaders = (headers: Header[]) => {
    setState((prev) => {
      return {
        ...prev,
        headers,
      }
    })
  }

  const setActions = (actions: Action[]) => {
    setState((prev) => {
      return {
        ...prev,
        actions,
      }
    })
  }

  const setStyles = (styles: Styles) => {
    setState((prev) => {
      return {
        ...prev,
        styles,
      }
    })
  }

  const setMasterCheck = (checkStatus: MasterCheck) => {
    setState((prev) => {
      return {
        ...prev,
        masterCheck: checkStatus,
      }
    })
  }

  const onItemCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number | string
  ) => {
    let newIds = [] as (number | string)[]
    if (e.target.checked) {
      newIds = [...selectedItemsById, id]
    } else {
      newIds = selectedItemsById.filter((selectedId) => selectedId !== id)
    }
    let masterCheck = 'indeterminite' as MasterCheck
    if (newIds.length === 0) {
      masterCheck = 'unchecked'
    } else if (newIds.length === items.length) {
      masterCheck = 'indeterminate'
    }

    setState((prev) => {
      return {
        ...prev,
        selectedItemsById: newIds,
        masterCheck,
      }
    })
  }

  const getItemById = (id: number | string) => {
    return items.find((item) => id === item.id)
  }

  const getItemsById = (ids: (number | string)[]) => {
    return ids.reduce((result, id) => {
      const item = items.find((item) => id === item.id)
      if (item) {
        return [...result, item]
      }
      return result
    }, [])
  }

  const getSelectedItems = () => {
    return selectedItemsById.reduce((result, id) => {
      const item = items.find((item) => id === item.id)
      if (item) {
        return [...result, item]
      }
      return result
    }, [] as Item[])
  }

  const getSortedItems = () => {
    return sortedItemsById.reduce((result, id) => {
      const item = items.find((item) => id === item.id)
      if (item) {
        return [...result, item]
      }
      return result
    }, [] as Item[])
  }

  const getFilteredItems = () => {
    return filteredItemsById.reduce((result, id) => {
      const item = items.find((item) => id === item.id)
      if (item) {
        return [...result, item]
      }
      return result
    }, [] as Item[])
  }

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
    if (sortParam && sortParam.slug === slug && sortParam.direction === 'asc') {
      // sorting by slug but in reverse
      setState((prev) => {
        return {
          ...prev,
          sortParam: {
            slug,
            direction: 'desc',
          },
          sortedItemsById: items
            .sort((a, b) => compare(a[slug], b[slug], 1))
            .map((item) => item.id),
        }
      })
    } else if (
      sortParam &&
      sortParam.slug === slug &&
      sortParam.direction === 'desc'
    ) {
      // talking sorting off slug and returning to sorting by init slug

      setState((prev) => {
        return {
          ...prev,
          sortParam: {
            slug: 'id',
            direction: '',
          },
          sortedItemsById: items
            .sort((a, b) => compare(a[headers[0].slug], b[headers[0].slug], -1))
            .map((item) => item.id),
        }
      })
    } else {
      // sorting by slug in ascending order

      setState((prev) => {
        return {
          ...prev,
          sortParam: {
            slug,
            direction: 'asc',
          },
          sortedItemsById: items
            .sort((a, b) => compare(a[slug], b[slug], -1))
            .map((item) => item.id),
        }
      })
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

  return {
    ...state,
    setItems,
    getItemById,
    getItemsById,
    setSearch,
    setHeaders,
    setMasterCheck,
    onItemCheck,
    setActions,
    setStyles,
    getSelectedItems,
    getSortedItems,
    getFilteredItems,
    sort,
    inner,
  }
}

export default useTable
