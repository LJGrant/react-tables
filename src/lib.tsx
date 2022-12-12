import { ReactNode } from 'react'

export interface Action {
  action: Function
  label: string
  classNames: string[]
}

export interface BetterItem {
  value?: string | number
  display: string | number | ReactNode
}

export interface FunctionalItem {
  value?: string | number
  functionalDisplay: ({ ...args }: any) => React.ReactNode
}

export function isBetterItem(item: unknown): item is BetterItem {
  return (item as BetterItem).value !== undefined
}

export function isFunctionalItem(item: unknown): item is FunctionalItem {
  return (item as FunctionalItem).functionalDisplay !== undefined
}

export interface DisplayProps {
  action: Function
}
export interface Header {
  label: string | number | ReactNode
  slug: string
  searchable?: boolean
  sortable?: boolean
}

export type Item = {
  id: string | number
  [key: string]: string | number | BetterItem | FunctionalItem
}

export interface SortParam {
  slug: string | null
  direction: string
}

export interface Styles {
  tableContainer?: string[]
  searchBar?: string[]
  searchInput?: string[]
  searchInputWrapper?: string[]
  buttonWrapper?: string[]
  checkbox?: string[]
  table?: string[]
  thead?: string[]
  tbody?: string[]
  tr?: string[]
  th?: string[]
  td?: string[]
  indicator?: string[]
}

export type MasterCheck = 'checked' | 'unchecked' | 'indeterminate'

export type TableState = {
  items: Item[]
  filteredItemsById: (number | string)[]
  selectedItemsById: (number | string)[]
  headers: Header[]
  masterCheck: MasterCheck
  searchParam: string
  sortParam?: SortParam
  actions: Action[]
  styles?: Styles
}

export type Table = {
  id: string | number
  state: TableState
}
