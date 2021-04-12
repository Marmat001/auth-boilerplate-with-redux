import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavigation = () => (
  <nav>
    <ul className='nav flex-column'>
      <li className='nav-item'>
        <Link to='/admin/dashboard' className='nav-link'>
          Dashboard
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/admin/tour' className='nav-link'>
          Tour
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/admin/tours' className='nav-link'>
          Tours
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/admin/continent' className='nav-link'>
          Continent
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/admin/country' className='nav-link'>
          Country
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/admin/coupon' className='nav-link'>
          Coupon
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/user/update-profile' className='nav-link'>
          Update Profile
        </Link>
      </li>
    </ul>
  </nav>
)

export default AdminNavigation
