import { Link } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const UserNavigation = ({ showNav, setShowNav }) => {
  const active = window.location.pathname

  return (
    <nav>
      <div className='pt-3 text-center'>
        <Button
          onClick={() => setShowNav(!showNav)}
          style={{ width: '110px' }}
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
            to='/user/dashboard'
            className={`nav-link mt-4 mb-4 ${
              active === '/user/dashboard' && 'active'
            }`}
          >
            Dashboard
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to='/user/wishlist'
            className={`nav-link mt-4 mb-4 ${
              active === '/user/wishlist' && 'active'
            }`}
          >
            Wishlist
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to='/user/update-profile'
            className={`nav-link mt-4 mb-4 ${
              active === '/user/update-profile' && 'active'
            }`}
          >
            Update Profile
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default UserNavigation
