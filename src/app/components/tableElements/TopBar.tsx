import { PlusIcon } from 'lucide-react'
import React from 'react'
import StatusFilter from './StatusFilter'
import SearchBar from './SearchBar'

function TopBar({
  openCreate,
  statusFilter,
  setStatusFilter,
  search,
  setSearch,
}: {
  openCreate: () => void
  statusFilter: 'All' | import('@/app/constants').OrderStatus
  setStatusFilter: (
    status: 'All' | import('@/app/constants').OrderStatus
  ) => void
  search: string
  setSearch: (s: string) => void
}) {
  return (
    <div className='flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex items-center gap-2'>
        <button
          onClick={openCreate}
          className='inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900'
        >
          <PlusIcon className='h-4 w-4' />
          New Order
        </button>
        <StatusFilter
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>
      <SearchBar search={search} setSearch={setSearch} />
    </div>
  )
}

export default TopBar
