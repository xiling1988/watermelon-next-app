import React from 'react'

function StatusPill({ order }: { order: { status: string } }) {
  return (
    <span
      className={[
        'rounded-full px-2 py-0.5 text-xs border',
        order.status === 'Delivered'
          ? 'border-emerald-300 text-emerald-700 dark:text-emerald-300'
          : order.status === 'Out For Delivery'
          ? 'border-blue-300 text-blue-700 dark:text-blue-300'
          : order.status === 'Active'
          ? 'border-amber-300 text-amber-700 dark:text-amber-300'
          : order.status === 'Canceled'
          ? 'border-rose-300 text-rose-700 dark:text-rose-300'
          : 'border-gray-300 text-gray-700 dark:text-gray-300',
      ].join(' ')}
    >
      {order.status}
    </span>
  )
}

export default StatusPill
