import React from 'react'
import './styles.scss'
import Table from './Table'

export type InitProps = {
  className?: string
}

const App: React.FC<InitProps> = ({ className = '' }) => {
  return (
    <Table className={className}>
      <Table.Header></Table.Header>
      <Table.Body></Table.Body>
    </Table>
  )
}

export default App
