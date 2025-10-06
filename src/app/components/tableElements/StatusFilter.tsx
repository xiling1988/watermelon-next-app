import { OrderStatus, statusOptions } from '@/app/constants'
import React from 'react'

function StatusFilter({
  statusFilter,
  setStatusFilter,
}: {
  statusFilter: OrderStatus
  setStatusFilter: (status: OrderStatus) => void
}) {
  return (
    <div className='relative z-20'>
      <select
        className='w-full h-9 py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800'
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as any)}
      >
        {statusOptions.map((status) => (
          <option
            key={status}
            value={status}
            className='text-gray-700 dark:bg-gray-900 dark:text-gray-300'
          >
            {status}
          </option>
        ))}
      </select>
    </div>
  )
}

export default StatusFilter
