import React from 'react'
import UserNavigation from '../components/UserNavigation'

const WishlistPage = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 text-center'>
          <UserNavigation />
        </div>
        <div className='col'>Wishlist Page</div>
      </div>
    </div>
  )
}

export default WishlistPage
