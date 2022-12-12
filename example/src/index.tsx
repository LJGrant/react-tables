import React from 'react'
import ReactDOM from 'react-dom/client'
import { TableProvidor } from 'lj-react-tables'
import App from './App'
import Example2 from './Example2'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  // <React.StrictMode>
  <TableProvidor>
    <App />
    <Example2 />
  </TableProvidor>
  // </React.StrictMode>
)
