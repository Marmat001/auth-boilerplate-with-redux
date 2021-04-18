import { useState } from 'react'
import UserNavigation from '../components/UserNavigation'

const WishlistPage = () => {
  const [showNav, setShowNav] = useState(true)

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className={`${showNav && 'col-md-2 text-center'}`}>
          <UserNavigation showNav={showNav} setShowNav={setShowNav} />
        </div>
        <div className='col'>Wishlist Page</div>
      </div>
    </div>
  )
}

export default WishlistPage
