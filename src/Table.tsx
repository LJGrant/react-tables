import React, { ReactNode } from 'react'
import TableBody from './TableBody'
import TableHeader from './TableHeader'

type TableProps = {
  className?: string
  children: ReactNode
}

const Table: React.FC<TableProps> = ({ className, children }) => {
  return <table className={`${className} table`}>{children}</table>
}

export default Object.assign(Table, {
  Body: TableBody,
  Header: TableHeader,
})
