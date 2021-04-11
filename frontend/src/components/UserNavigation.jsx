import React from 'react'
import { Link } from 'react-router-dom'

const UserNavigation = () => (
  <nav>
    <ul className='nav flex-column'>
      <li className='nav-item'>
        <Link to='/user/dashboard' className='nav-link'>
          Dashboard
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/user/update-profile' className='nav-link'>
          Update Profile
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/user/wishlist' className='nav-link'>
          Wishlist
        </Link>
      </li>
    </ul>
  </nav>
)

export default UserNavigation
