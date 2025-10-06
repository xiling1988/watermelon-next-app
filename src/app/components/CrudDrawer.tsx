import { on } from 'events'
import { PencilIcon, TrashIcon, XIcon } from 'lucide-react'
import React from 'react'
import { formatCurrency, formatDate } from '../utils'
import { Order, OrderStatus } from '../constants'

interface ViewDrawerProps {
  order: Order
  onClose: () => void
  remove: (id: number) => void
  openEdit: (id: number) => void
}

function CrudDrawer({
  editId,
  setIsFormOpen,
  isFormOpen,
  form,
  setForm,
  submitForm,
}: {
  editId: number | null
  setIsFormOpen: (open: boolean) => void
  isFormOpen: boolean
  form: Omit<Order, 'id'>
  setForm: React.Dispatch<React.SetStateAction<Omit<Order, 'id'>>>
  submitForm: (e: React.FormEvent) => void
}) {
  if (!isFormOpen) return null
  const statusOptions = [
    'Pending',
    'Active',
    'Out For Delivery',
    'Delivered',
    'Canceled',
  ]
  return (
    <div className='fixed inset-0 z-40 flex'>
      <div className='ml-auto h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-800 p-4 overflow-y-auto'>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='text-base font-semibold'>
            {editId == null ? 'Create Order' : `Edit Order #${editId}`}
          </h3>
          <button
            className='p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800'
            onClick={() => setIsFormOpen(false)}
            aria-label='Close'
          >
            <XIcon className='h-5 w-5' />
          </button>
        </div>

        <form className='space-y-3' onSubmit={submitForm}>
          <div>
            <label className='block text-sm mb-1'>Customer</label>
            <input
              className='w-full h-10 rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3'
              value={form.customer}
              onChange={(e) =>
                setForm((f) => ({ ...f, customer: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className='block text-sm mb-1'>Location</label>
            <input
              className='w-full h-10 rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3'
              value={form.location}
              onChange={(e) =>
                setForm((f) => ({ ...f, location: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className='block text-sm mb-1'>Status</label>
            <select
              className='w-full h-10 rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3'
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  status: e.target.value as OrderStatus,
                }))
              }
            >
              {statusOptions.map((s) => (
                <option key={s} value={s} className='dark:bg-gray-900'>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-sm mb-1'>Total (USD)</label>
            <input
              type='number'
              step='0.01'
              min={0}
              className='w-full h-10 rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3'
              value={form.total}
              onChange={(e) =>
                setForm((f) => ({ ...f, total: Number(e.target.value) }))
              }
              required
            />
          </div>

          <div>
            <label className='block text-sm mb-1'>Created At</label>
            <input
              type='datetime-local'
              className='w-full h-10 rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3'
              value={
                // convert ISO -> local datetime-local value
                new Date(form.createdAt).toISOString().slice(0, 16)
              }
              onChange={(e) => {
                // value is local time; store as ISO
                const local = new Date(e.target.value)
                setForm((f) => ({ ...f, createdAt: local.toISOString() }))
              }}
              required
            />
          </div>

          <div className='pt-2 flex items-center gap-2'>
            <button
              type='submit'
              className='inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
            >
              {editId == null ? 'Create' : 'Save Changes'}
            </button>
            <button
              type='button'
              className='inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-transparent px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800'
              onClick={() => setIsFormOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop */}
      <button
        className='flex-1 bg-black/20 backdrop-blur-[1px]'
        onClick={() => setIsFormOpen(false)}
        aria-label='Close'
      />
    </div>
  )
}

export default CrudDrawer
