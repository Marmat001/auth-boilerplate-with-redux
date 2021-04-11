import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const RedirectAfterSetTime = ({ userInfo }) => {
  const [count, setCount] = useState(3)
  const history = useHistory()

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)

    count === 0 && userInfo && history.push('/')
    count === 0 && !userInfo && history.push('/login')

    return () => clearInterval(timer)
  }, [count, history, userInfo])

  return (
    <div className='container p-5 text-center'>
      <p>Redirecting you in {count} seconds</p>
    </div>
  )
}

export default RedirectAfterSetTime
