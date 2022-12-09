import React, { useCallback, useContext } from 'react'
import { TableContext } from '../context/TableContext'
import {
  Action,
  Header,
  isBetterItem,
  isFunctionalItem,
  Item,
  MasterCheck,
  Styles,
} from '../lib'
import update from 'immutability-helper'

const useTable = () => {
  const { state, setState } = useContext(TableContext)
  const { items, filteredItemsById, selectedItemsById, headers, sortParam } =
    state

  if (setState === undefined || state === undefined) {
    throw new Error('setState is not defined')
  }

  const setItems = (items: Item[]) => {
    setState((prev) => {
      return {
        ...prev,
        items,
        sortedItemsById: items.map((item) => item.id),
      }
    })
  }

  const addItems = (items: Item[]) => {
    setState((prev) => {
      return { ...prev, items: [...prev.items, ...items] }
    })
  }

  const removeItems = (ids: (number | string)[]) => {
    setState((prev) => {
      return {
        ...prev,
        items: [...prev.items.filter((item) => !ids.includes(item.id))],
        selectedItemsById: [
          ...prev.selectedItemsById.filter((id) => !ids.includes(id)),
        ],
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
    if (checkStatus === 'checked') {
      setState((prev) => {
        return {
          ...prev,
          masterCheck: checkStatus,
          selectedItemsById: items.map((item) => item.id),
        }
      })
    } else if (checkStatus === 'unchecked') {
      setState((prev) => {
        return {
          ...prev,
          masterCheck: checkStatus,
          selectedItemsById: [],
        }
      })
    }
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
    let masterCheck = 'indeterminate' as MasterCheck
    if (newIds.length === 0) {
      masterCheck = 'unchecked'
    } else if (newIds.length === items.length) {
      masterCheck = 'checked'
    }

    setState((prev) => {
      return {
        ...prev,
        selectedItemsById: newIds,
        masterCheck,
      }
    })
  }

  const getItems = () => {
    return items
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
          items: items
            .sort((a, b) => compare(a[slug], b[slug], 1))
            .map((item) => item),
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
          items: items
            .sort((a, b) => compare(a[headers[0].slug], b[headers[0].slug], -1))
            .map((item) => item),
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
          items: items
            .sort((a, b) => compare(a[slug], b[slug], -1))
            .map((item) => item),
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

  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    setState((prev) => {
      return {
        ...prev,

        sortParam: {
          slug: null,
          direction: '',
        },
        items: update(prev.items, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prev.items[dragIndex]],
          ],
        }),
      }
    })
  }, [])

  return {
    ...state,
    setItems,
    removeItems,
    addItems,
    getItems,
    getItemById,
    getItemsById,
    setSearch,
    setHeaders,
    setMasterCheck,
    onItemCheck,
    setActions,
    setStyles,
    getSelectedItems,
    getFilteredItems,
    sort,
    inner,
    moveRow,
  }
}

export default useTable