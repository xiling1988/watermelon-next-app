import React from 'react'
import { TableBody, TableCell, TableRow } from './tableElements'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Order } from '@/app/constants'
import StatusPill from './StatusPill'
import ActionsCell from './ActionsCell'

function OrderTableBody({
  sorted,
  formatCurrency,
  formatDate,
  openEdit,
  remove,
}: {
  sorted: Order[]
  formatCurrency: (amount: number) => string
  formatDate: (dateString: string) => string
  openEdit: (id: number) => void
  remove: (id: number) => void
}) {
  return (
    <TableBody>
      {sorted.map((order) => (
        <TableRow key={order.id}>
          <TableCell className='px-4 py-4 font-medium text-gray-800 border border-gray-100 dark:border-white/[0.05] dark:text-white text-theme-sm whitespace-nowrap'>
            #{order.id}
          </TableCell>
          <TableCell className='px-4 py-4 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap'>
            {order.customer}
          </TableCell>
          <TableCell className='px-4 py-4 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap'>
            {order.location}
          </TableCell>
          <TableCell className='px-4 py-4 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap'>
            <StatusPill order={order} />
          </TableCell>
          <TableCell className='px-4 py-4 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap'>
            {formatCurrency(order.total)}
          </TableCell>
          <TableCell className='px-4 py-4 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap'>
            {formatDate(order.createdAt)}
          </TableCell>
          <TableCell className='px-4 py-4 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap'>
            <ActionsCell order={order} openEdit={openEdit} remove={remove} />
          </TableCell>
        </TableRow>
      ))}
      {sorted.length === 0 && (
        <TableRow>
          <TableCell
            colSpan={7}
            className='px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400'
          >
            No orders found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

export default OrderTableBody
