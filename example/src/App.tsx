import React, { useCallback, useEffect } from 'react'
import Table, {
  useTable,
  Item,
  BetterItem,
  FunctionalItem,
} from 'lj-react-tables'
import { v4 as uuidv4 } from 'uuid'
interface AppItem extends Item {
  id: string | number
  label: BetterItem
  foo: string
  bar: string
  edit: FunctionalItem
}

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

const App = () => {
  const {
    items,
    getItems,
    setItems,
    setActions,
    setHeaders,
    setStyles,
    removeItems,
    addItems,
  } = useTable()

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

  const deleteItems = useCallback(
    (deleteItems: AppItem[]): void => {
      removeItems(deleteItems.map((item) => item.id))
    },
    [items]
  )

  const addItem = (): void => {
    addItems(makeItems(1))
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

  const clgItems = () => {
    console.log(getItems())
    console.log(items)
  }

  useEffect(() => {
    setItems(makeItems(8))
    setActions(actions)
    setHeaders(headers)
    setStyles(styles)
  }, [])

  return (
    <div className="container">
      <h1>Fun with tables...</h1>
      <button onClick={clgItems}>Click Me</button>
      <div className="row">
        <Table search={true} draggable={true} />
      </div>
    </div>
  )
}

export default App
