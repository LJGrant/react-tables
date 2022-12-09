import React from 'react'
import ReactDOM from 'react-dom/client'
import { TableProvidor } from 'lj-react-tables'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <TableProvidor>
      <App />
    </TableProvidor>
  </React.StrictMode>
)
