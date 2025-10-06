'use client'

import { useMemo, useRef, useState } from 'react'
import { Table } from './tableElements/tableElements'
import { initialOrders } from '../constants/mock-data'
import { Order, OrderStatus, SortKey, SortOrder } from '../constants'
import { formatCurrency, formatDate } from '../utils'
import OrdersTableHeader from './tableElements/OrdersTableHeader'
import OrderTableBody from './tableElements/OrderTableBody'
import CrudDrawer from './CrudDrawer'
import TopBar from './tableElements/TopBar'

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus>('All')

  const [sortKey, setSortKey] = useState<SortKey>('createdAt')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)

  // uses the Order type but takes out the id field as it's generated at creation
  const [form, setForm] = useState<Omit<Order, 'id'>>({
    customer: '',
    location: '',
    status: 'Pending',
    total: 0,
    createdAt: new Date().toISOString(),
  })

  // Simple incremental id generator starting at the max existing id + 1
  const nextId = useRef(Math.max(...orders.map((order) => order.id)) + 1)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const filtered: Order[] = useMemo(() => {
    const term = search.trim().toLowerCase()
    return orders.filter((order) => {
      const matchesSearch =
        term === '' ||
        order.customer.toLowerCase().includes(term) ||
        String(order.id).includes(term)

      // If searched term is not included in current filter, search is unsuccessful
      const matchesStatus =
        statusFilter === 'All' || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [orders, search, statusFilter])

  const sorted = useMemo(() => {
    const copy = [...filtered]
    copy.sort((a, b) => {
      const A = a[sortKey]
      const B = b[sortKey]
      if (sortKey === 'total' || sortKey === 'id') {
        const diff = (A as number) - (B as number)
        return sortOrder === 'asc' ? diff : -diff
      }
      // createdAt is ISO string; others are strings
      const result = String(A).localeCompare(String(B), undefined, {
        numeric: sortKey === 'createdAt',
      })
      return sortOrder === 'asc' ? result : -result
    })
    return copy
  }, [filtered, sortKey, sortOrder])

  const openCreate = () => {
    setEditId(null)
    setForm({
      customer: '',
      location: '',
      status: 'Pending',
      total: 0,
      createdAt: new Date().toISOString(),
    })
    setIsFormOpen(true)
  }

  const openEdit = (id: number) => {
    const order = orders.find((x) => x.id === id)
    if (!order) return
    setEditId(id)
    setForm({
      customer: order.customer,
      location: order.location,
      status: order.status,
      total: order.total,
      createdAt: order.createdAt,
    })
    setIsFormOpen(true)
  }

  const deleteOrder = (id: number) => {
    // tiny confirm for demo
    if (!confirm(`Delete order #${id}?`)) return
    setOrders((prev) => prev.filter((order) => order.id !== id))
  }

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.customer.trim() || !form.location.trim()) return

    if (editId == null) {
      const order: Order = { id: nextId.current++, ...form }
      setOrders((prev) => [order, ...prev])
    } else {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === editId ? { ...order, ...form } : order
        )
      )
    }
    setIsFormOpen(false)
  }

  return (
    <div className='overflow-hidden rounded-xl bg-white dark:bg-white/[0.03]'>
      <TopBar
        openCreate={openCreate}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        search={search}
        setSearch={setSearch}
      />

      <Table>
        <OrdersTableHeader
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          handleSort={handleSort}
          sortKey={sortKey}
          sortOrder={sortOrder}
        />
        <OrderTableBody
          sorted={sorted}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          openEdit={openEdit}
          remove={deleteOrder}
        />
      </Table>

      {isFormOpen && (
        <CrudDrawer
          editId={editId}
          setIsFormOpen={setIsFormOpen}
          isFormOpen={isFormOpen}
          form={form}
          setForm={setForm}
          submitForm={submitForm}
        />
      )}
    </div>
  )
}
