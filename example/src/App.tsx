import React, { useEffect, useState } from 'react'
import { DragTable, Item, BetterItem, FunctionalItem } from 'lj-react-tables'
import { v4 as uuidv4 } from 'uuid'
interface AppItem extends Item {
  id: string
  label: BetterItem
  foo: string
  bar: string
  edit: FunctionalItem
}

const App = () => {
  const displayItem = (item: AppItem): React.ReactNode => (
    <button onClick={() => alert(item.label.value)}>{item.bar} Me</button>
  )

  const makeItems = (x: number) => {
    const leItems: AppItem[] = []
    for (let i = 0; i < x; i++) {
      const id = uuidv4()
      leItems[i] = {
        id: id.substring(0, 5),
        label: {
          value: id.substring(9, 13),
          display: (
            <>
              <span>THING</span> {id.substring(9, 13)}
            </>
          ),
        },
        foo: 'foo' + id.substring(14, 18),
        bar: 'bar' + id.substring(19, 22),
        edit: {
          functionalDisplay: displayItem,
        },
      }
    }
    return leItems
  }

  const [items, setItems] = useState<AppItem[]>(makeItems(8))

  const headers = [
    {
      label: 'Id',
      slug: 'id',
    },
    {
      label: 'Label',
      slug: 'label',
    },
    {
      label: 'Foo',
      slug: 'foo',
      sortable: false,
    },
    {
      label: 'Barington',
      slug: 'bar',
      searchable: false,
    },
    {
      label: 'Edit',
      slug: 'edit',
      searchable: false,
      sortable: false,
    },
  ]

  const deleteItems = (items: AppItem[]): void => {
    const ids = items.map((item) => item.id)
    setItems((prevState) => [
      ...prevState.filter((item) => !ids.includes(item.id)),
    ])
  }

  const addItem = (): void => {
    setItems((prevState) => [...prevState, ...makeItems(1)])
  }

  const actions = [
    {
      action: deleteItems,
      label: 'Delete',
      classNames: ['btn', 'btn-danger'],
    },
    {
      action: addItem,
      label: 'Add',
      classNames: ['btn', 'btn-primary'],
    },
  ]

  const styles = {
    tableContainer: ['container'],
    searchBar: ['manage-head', 'row'],
    searchInputWrapper: ['col-auto'],
    buttonWrapper: ['col-auto'],
    searchInput: ['form-control'],
    table: [
      'table',
      'table-sm',
      'table-striped',
      'table-bordered',
      'table-hover',
    ],
  }

  const getSelected = (items: AppItem): void => {
    console.log('--')
    console.log('selected')
    console.log(items)
    console.log('--')
  }

  useEffect(() => {
    console.log('--')
    console.log('items in example')
    console.log(items)
    console.log('--')
  }, [items])

  return (
    <div className="container">
      <h1>Fun with tables...</h1>
      <div className="row">
        <DragTable
          styles={styles}
          headers={headers}
          items={items}
          actions={actions}
          search={true}
          returnUpdate={setItems}
          getSelected={getSelected}
        />
      </div>
    </div>
  )
}

export default App
