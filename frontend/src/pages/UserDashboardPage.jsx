import React from 'react'
import UserNavigation from '../components/UserNavigation'

const UserDashboardPage = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 text-center pt-3 nav-border pb-3'>
          <UserNavigation />
        </div>
        <div className='col'>User Page</div>
      </div>
    </div>
  )
}

export default UserDashboardPage
