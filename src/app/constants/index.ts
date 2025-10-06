export type OrderStatus =
  | 'All'
  | 'Pending'
  | 'Active'
  | 'Out For Delivery'
  | 'Delivered'
  | 'Canceled'

export type Order = {
  id: number
  customer: string
  location: string
  status: OrderStatus
  total: number // stored as number, displayed as currency
  createdAt: string // ISO date string
}

export type SortKey = keyof Pick<
  Order,
  'id' | 'customer' | 'location' | 'status' | 'total' | 'createdAt'
>
export type SortOrder = 'asc' | 'desc'

export const statusOptions: OrderStatus[] = [
  'All',
  'Pending',
  'Active',
  'Out For Delivery',
  'Delivered',
  'Canceled',
]

export const tableColumns: { key: SortKey; label: string }[] = [
  { key: 'id', label: 'Order ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'location', label: 'Location' },
  { key: 'status', label: 'Status' },
  { key: 'total', label: 'Total' },
  { key: 'createdAt', label: 'Created At' },
]
