# React Table

A package for creating table components in React that provide easy customization of headers, content, and functionality with selected items

## How to use

Install package with

- `npm install repo/react-tables`

Import component into your react page

- `Import Table from 'react-tables`

## Example Use

```jsx
import { useState } from 'react'
import Table from 'react-tables'

const App = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      label: 'label',
      foo: 'foo',
      bar: 'bar',
    },
    {
      id: 2,
      label: 'label',
      foo: 'foo',
      bar: 'bar',
    },
    {
      id: 3,
      label: 'label',
      foo: 'foo',
      bar: 'bar',
    },
    {
      id: 4,
      label: 'label',
      foo: 'foo',
      bar: 'bar',
    },
    {
      id: 5,
      label: 'label',
      foo: 'foo',
      bar: 'bar',
    },
    {
      id: 6,
      label: 'label',
      foo: 'foo',
      bar: 'bar',
    },
  ])

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
      label: 'Foo Header',
      slug: 'foo',
    },
    {
      label: 'Bar Header',
      slug: 'bar',
    },
  ]

  const deleteItems = (items) => {
    const ids = items.map((item) => item.id)
    setItems((prevState) => [
      ...prevState.filter((item) => !ids.includes(item.id)),
    ])
  }

  const addItem = () => {
    setItems((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        label: 'one',
        foo: 'foo',
        bar: 'bar',
      },
    ])
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
    table: ['table', 'table-striped'],
  }

  return (
    <div className="container">
      <h1>Fun with tables...</h1>
      <div className="row">
        <Table
          styles={styles}
          headers={headers}
          items={items}
          search={true}
          actions={actions}
        />
      </div>
    </div>
  )
}

export default App
```

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
