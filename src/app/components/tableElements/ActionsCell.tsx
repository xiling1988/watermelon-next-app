import { PencilIcon, TrashIcon } from 'lucide-react'
import React from 'react'

function ActionsCell({
  order,
  openEdit,
  remove,
}: {
  order: { id: number }
  openEdit: (id: number) => void
  remove: (id: number) => void
}) {
  return (
    <div className='flex items-center gap-2'>
      <button
        className='text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90'
        onClick={() => openEdit(order.id)}
        title='Edit'
      >
        <PencilIcon className='h-5 w-5' />
      </button>
      <button
        className='text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500'
        onClick={() => remove(order.id)}
        title='Delete'
      >
        <TrashIcon className='h-5 w-5' />
      </button>
    </div>
  )
}

export default ActionsCell
