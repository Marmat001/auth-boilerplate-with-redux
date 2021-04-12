import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authentication } from '../firebase'
import { Card, Button } from 'antd'

const RegisterPage = ({ history }) => {
  const [email, setEmail] = useState('markusmatu96@gmail.com')
  const [buttonText, setButtonText] = useState('Submit')

  const userDetails = useSelector((state) => state.user)

  useEffect(() => {
    if (userDetails && userDetails.token) history.push('/')
  }, [userDetails, history])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setButtonText('Submitting')
    const configObj = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    }

    await authentication.sendSignInLinkToEmail(email, configObj)
    toast.success(
      `Email has been sent to ${email}. Follow the instructions to activate your account.`
    )
    window.localStorage.setItem('registrationEmail', email)
    setButtonText('Submitted')
    setEmail('')
  }

  return (
    <div className='col-md-6 offset-md-3 p-5'>
      <Card>
        <h1 className='pt-5 text-center'>Register</h1>

        <form onSubmit={handleSubmit} className='form-background p-4'>
          <div className='form-group'>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type='email'
              className='form-control input-background p-3'
              placeholder='Email'
            />
            <label>Email</label>
          </div>

          <Button
            disabled={
              !email ||
              buttonText === 'Submitted' ||
              buttonText === 'Submitting'
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
            <Link
              to='/authentication/forgot-password'
              className='btn btn-sm btn-outline-danger'
            >
              Forgot Password?
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

export default RegisterPage
