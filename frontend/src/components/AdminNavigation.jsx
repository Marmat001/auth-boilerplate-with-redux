import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavigation = () => {
  const active = window.location.pathname

  return (
    <nav>
      <ul className='nav flex-column nav-border'>
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
            to='/admin/orders'
            className={`nav-link mt-4 mb-4 ${
              active === '/admin/orders' && 'active'
            }`}
          >
            Orders
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
