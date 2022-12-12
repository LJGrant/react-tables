# React Table

A package for creating table components in React that provide easy customization of headers, content, and functionality with selected items

## How to use

Install package

- `npm install repo/lj-react-tables`

Wrap App in TableProvidor component

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { TableProvidor } from 'lj-react-tables'
import App from './App'
import Example2 from './Example2'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
    <TableProvidor>
      <App />
    </TableProvidor>
)
```

Import Table component and initiating hooks into your react page

- `Import Table and useCreateTable from 'lj-react-tables`

## Example Use

```jsx
import React, { useCallback, useEffect } from 'react'
import Table, {
  useCreateTable,
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
    setItems,
    setActions,
    setHeaders,
    setStyles,
    removeItems,
    addItems,
    destroyTable,
  } = useCreateTable('one')

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
    console.log(items)
  }

  useEffect(() => {
    setItems(makeItems(8))
    setActions(actions)
    setHeaders(headers)
    setStyles(styles)

    return function cleanUp() {
      destroyTable()
    }
  }, [])

  return (
    <div className="container">
      <h1>Fun with tables...</h1>
      <button onClick={clgItems}>Click Me</button>
      <div className="row">
        <Table
          id={'one'}
          search={true}
          draggable={true}
        />
      </div>
    </div>
  )
}

export default App


```

## useCreateTable and useTable Hooks

These hooks provide access to the table state and functions to set up properties of the table including the items, headers, styles, and action buttons.

- setItems: sets items to show in the table
- removeItems: removes specified row items
- addItems: adds row items without removing existing rows
- getItems: returns an array of existing array items
- getItemById: returns a specific item by it's id
- getItemsById: returns an array of items when provided with an array of ids
- setSearch: provides control of the search param outside of the inbuilt search bar
- setHeaders: sets headers of table
- setMasterCheck: provides control of the master check box outside it's normal checkbox
- setActions: sets action buttons
- setStyles: sets styling classnames on various components
- getSelectedItems: returns items who's check boxes have been checked
- getFilteredItems: return items filtered by the search param

## Items & Headers

The Headers object will determain what keys from your items array are dislpayed and their sorting functionality. Headers _slug_ should be set to the associated Item property.

The _id_ property is only required property of the Item object.

Items is an array of objects with keys relating to the header slugs

### Header Object

- _label_ : String that will be displayed on the column head text
- _slug_ : String of item property that the header is associated to
- _searchable_ : Boolean property to allow the table to be searchable by this column
- _sortable_ : Boolean property to allow the table to be sortable by this column

### Item Object

Within the Item object, the value of each property will be displalied in the column of it's associated Header slug. Alternitivly, that value could be set as an object with keys of _display_ and _value_. This will allow you to set the _display_ property to a React Componant but still provide search & sort functionality for the underlying value.

Additionally, you can set up a functioning component with a onClick or other functionality attached using functionalDisplay property instead of the display property.

## Search

Setting the search prop to true will allow for search functionality. The search function will filter on every header _slug_.

## Actions

Each action object will be displayed as a button in line with the search bar.

- _label_ : String what will be displayed as the button text.
- _action_ : Function called on buttons "onClick" function. Will pass selected Items into callback.
- _classNames_ : Array of string class names to be applied to this button. Used for styling

## Styles

Object that will define what classNames are set on each stylable componant within table. Should be formated as an array of strings that will be applied as className.

Avilable objects to style:

- tableContainer: Container wrapping whole component
- searchBar: div containing the search bar and action buttons
- searchInput: the search input
- searchInputWrapper: div wrapping the search input
- buttonWrapper: div wrapping action buttons
- table
- thead
- tbody
- tr
- th
- td
- indicator: arrow indicator that appears on sortable headers
