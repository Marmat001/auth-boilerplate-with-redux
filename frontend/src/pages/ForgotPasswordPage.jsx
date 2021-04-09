import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Card, Button } from 'antd'
import { useSelector } from 'react-redux'
import { authentication } from '../firebase'

const initialState = {
  email: '',
  buttonText: 'Request password reset link',
}

const ForgotPasswordPage = ({ history }) => {
  const [userInfo, setUserInfo] = useState(initialState)
  const { email, buttonText } = userInfo

  const userDetails = useSelector((state) => state.user)

  useEffect(() => {
    if (userDetails && userDetails.token) history.push('/')
  }, [userDetails])

  const handleChange = (name) => (e) => {
    setUserInfo({ ...userInfo, [name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUserInfo({ ...userInfo, buttonText: 'Submitting' })
    const configObj = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    }

    await authentication
      .sendPasswordResetEmail(email, configObj)
      .then(() => {
        setUserInfo({ ...userInfo, email: '', buttonText: 'Requested' })
        toast.success(
          'Successful request! Check your email for the password reset link'
        )
      })
      .catch((error) => {
        setUserInfo({ ...userInfo, buttonText: 'Request password reset link' })
        toast.error(error.message)
      })
  }

  return (
    <div className='col-md-6 offset-md-3 p-5'>
      <Card>
        <h1 className='pt-5 text-center'>Forgot Password</h1>
        <form className='p-4'>
          <div className='form-group'>
            <input
              onChange={handleChange('email')}
              value={email}
              type='email'
              className='form-control input-background p-3'
              placeholder='Email'
            />
            <label>Email</label>
          </div>

          <Button
            disabled={
              buttonText === 'Requested' ||
              buttonText === 'Submitting' ||
              !email
            }
            onClick={handleSubmit}
            block
            shape='round'
            size='large'
            className='btn btn-primary btn-raised mt-3 mb-3'
          >
            {buttonText}
          </Button>

          <div className='d-flex justify-content-center align-items-center mt-3'>
            <Link to='/register' className='btn btn-sm btn-outline-danger'>
              New customer? Register
            </Link>

            <Link to='/login' className='btn btn-sm btn-outline-primary ml-4'>
              Have an account? Log In
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default ForgotPasswordPage
