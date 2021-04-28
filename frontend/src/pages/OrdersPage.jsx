import { useState } from 'react'
import UserNavigation from '../components/UserNavigation'
import { Button, Card } from 'antd'
import { toast } from 'react-toastify'
import { authentication } from '../firebase'
import { useSelector } from 'react-redux'
import AdminNavigation from '../components/AdminNavigation'

const OrdersPage = () => {
  const [showNav, setShowNav] = useState(true)

  const user = useSelector((state) => state.user)

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className={`${showNav && 'col-md-2 text-center'}`}>
          {user.role === 'admin' ? (
            <AdminNavigation />
          ) : (
            <UserNavigation showNav={showNav} setShowNav={setShowNav} />
          )}
        </div>
        <div className='col'>Orders Page</div>
      </div>
    </div>
  )
}

export default OrdersPage
