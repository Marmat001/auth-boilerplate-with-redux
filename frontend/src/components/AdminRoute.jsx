import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import RedirectAfterSetTime from './RedirectAfterSetTime'
import { getAdminInfo } from '../helperFunctions/authFunction'

const AdminRoute = ({ children, ...rest }) => {
  const [approved, setApproved] = useState(false)
  const userInfo = useSelector((state) => state.user)

  useEffect(() => {
    if (userInfo && userInfo.token) {
      getAdminInfo(userInfo.token)
        .then(() => {
          setApproved(true)
        })
        .catch(() => {
          setApproved(false)
        })
    }
  }, [userInfo])

  return approved ? (
    <Route {...rest} />
  ) : (
    <RedirectAfterSetTime userInfo={userInfo} />
  )
}

export default AdminRoute
