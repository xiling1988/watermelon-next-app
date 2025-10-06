import Image from 'next/image'
import OrdersTable from './components/OrdersTable'

export default function Home() {
  return (
    <div>
      <div className='space-y-5 sm:space-y-6 p-24'>
        <OrdersTable />
      </div>
    </div>
  )
}
