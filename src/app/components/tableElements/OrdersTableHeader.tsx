import React from 'react'
import { TableCell, TableHeader, TableRow } from './tableElements'
import { OrderStatus, SortKey, tableColumns } from '@/app/constants'
import { ArrowDown, ArrowUp } from 'lucide-react'

function OrdersTableHeader({
  statusFilter,
  setStatusFilter,
  handleSort,
  sortKey,
  sortOrder,
}: {
  statusFilter: 'All' | OrderStatus
  setStatusFilter: (status: 'All' | OrderStatus) => void
  handleSort: (key: SortKey) => void
  sortKey: SortKey | null
  sortOrder: 'asc' | 'desc'
}) {
  return (
    <TableHeader className='border-t border-gray-100 dark:border-white/[0.05]'>
      <TableRow>
        {tableColumns.map(({ key, label }: { key: SortKey; label: string }) => (
          <TableCell
            key={key}
            isHeader
            className='px-4 py-3 border border-gray-100 dark:border-white/[0.05]'
          >
            <div
              className='flex items-center justify-between cursor-pointer'
              onClick={() => handleSort(key as SortKey)}
            >
              <p className='font-medium text-gray-700 text-theme-xs dark:text-gray-400'>
                {label}
              </p>
              <span className='flex flex-col gap-0.5'>
                <ArrowUp
                  className={`text-gray-300 dark:text-gray-700 h-3 ${
                    sortKey === key && sortOrder === 'asc'
                      ? 'text-brand-500'
                      : ''
                  }`}
                />
                <ArrowDown
                  className={`text-gray-300 dark:text-gray-700 h-3 ${
                    sortKey === key && sortOrder === 'desc'
                      ? 'text-brand-500'
                      : ''
                  }`}
                />
              </span>
            </div>
          </TableCell>
        ))}
        <TableCell
          isHeader
          className='px-4 py-3 border border-gray-100 dark:border-white/[0.05]'
        >
          <p className='font-medium text-gray-700 text-theme-xs dark:text-gray-400'>
            Actions
          </p>
        </TableCell>
      </TableRow>
    </TableHeader>
  )
}

export default OrdersTableHeader
