import React from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import RedirectAfterSetTime from './RedirectAfterSetTime'

const UserRoute = ({ children, ...rest }) => {
  const userInfo = useSelector((state) => state.user)

  return userInfo && userInfo.token ? (
    <Route {...rest} />
  ) : (
    <RedirectAfterSetTime />
  )
}

export default UserRoute
