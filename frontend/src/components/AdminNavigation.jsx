import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const AdminNavigation = () => {
  const active = window.location.pathname
  const [showNav, setShowNav] = useState(true)

  return (
    <nav className={`${showNav && 'nav-border'}`}>
      <div className='pt-3'>
        <Button
          onClick={() => setShowNav(!showNav)}
          style={{ width: '100px' }}
          className='btn btn-raised btn'
          type='primary'
          size='large'
          shape='round'
          icon={<MenuOutlined />}
        ></Button>
      </div>
      <ul className={`nav flex-column mt-2 ${!showNav && 'nav-anim'}`}>
        <li className='nav-item'>
          <Link
            to='/admin/dashboard'
            className={`nav-link mt-4 mb-4 ${
              active === '/admin/dashboard' && 'active'
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/admin/tours'
            className={`nav-link mt-4 mb-4 ${
              active === '/admin/tours' && 'active'
            }`}
          >
            View Tours
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/admin/tour'
            className={`nav-link mt-4 mb-4 ${
              active === '/admin/tour' && 'active'
            }`}
          >
            Add Tour
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/admin/continent'
            className={`nav-link mt-4 mb-4 ${
              active === '/admin/continent' && 'active'
            }`}
          >
            Add Continent
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/admin/country'
            className={`nav-link mt-4 mb-4 ${
              active === '/admin/country' && 'active'
            }`}
          >
            Add Country
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/admin/coupon'
            className={`nav-link mt-4 mb-4 ${
              active === '/admin/coupon' && 'active'
            }`}
          >
            Add Coupon
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/admin/update-profile'
            className={`nav-link mt-4 mb-4 ${
              active === '/admin/update-profile' && 'active'
            }`}
          >
            Update Profile
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default AdminNavigation
