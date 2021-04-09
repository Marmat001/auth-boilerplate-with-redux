import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authentication } from '../firebase'
import { toast } from 'react-toastify'
import { Card, Button } from 'antd'

const initialState = {
  name: 'Markus',
  email: 'markusmatu96@gmail.com',
  password: 'abohassan',
  confirmPassword: 'abohassan',
  buttonText: 'Submit',
}

const RegisterFinalPage = ({ history }) => {
  const [userInfo, setUserInfo] = useState(initialState)

  const { name, email, password, confirmPassword, buttonText } = userInfo

  const userDetails = useSelector((state) => state.user)

  useEffect(() => {
    if (userDetails && userDetails.token) history.push('/')
  }, [userDetails])

  const handleChange = (name) => (e) => {
    setUserInfo({ ...userInfo, [name]: e.target.value })
  }

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      email: window.localStorage.getItem('registrationEmail'),
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword)
      return toast.error('Passwords do not match')

    if (!email || !password) {
      return toast.error('Email and password is required')
    }

    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters long')
    }

    setUserInfo({ ...userInfo, buttonText: 'Submitting' })
    try {
      const response = await authentication.signInWithEmailLink(
        email,
        window.location.href
      )
      if (!response.user.emailVerified) return

      window.localStorage.removeItem('registrationEmail')

      const user = authentication.currentUser

      await user.updatePassword(password)

      const token = await user.getIdTokenResult()

      console.log(user, token)

      setUserInfo({
        ...userInfo,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        buttonText: 'Submitted',
      })

      toast.success('Registration successful!')

      history.push('/')
    } catch (error) {
      setUserInfo({ ...userInfo, buttonText: 'Submit' })
      toast.error(error.message)
    }
  }

  return (
    <div className='col-md-6 offset-md-3 p-5'>
      <Card>
        <h1 className='pt-5 text-center'>Complete Registration</h1>
        <form className='p-4'>
          <div className='form-group'>
            <input
              onChange={handleChange('name')}
              value={name}
              type='text'
              className='form-control input-background p-3'
              placeholder='Name'
              autoFocus
            />
            <label>Name</label>
          </div>

          <div className='form-group'>
            <input
              value={email}
              type='email'
              className='form-control input-background p-3'
              disabled
            />
            <label>Email</label>
          </div>

          <div className='form-group'>
            <input
              onChange={handleChange('password')}
              value={password}
              type='password'
              className='form-control input-background p-3'
              placeholder='Password'
            />
            <label>Password</label>
          </div>

          <div className='form-group'>
            <input
              onChange={handleChange('confirmPassword')}
              value={confirmPassword}
              type='password'
              className='form-control input-background p-3'
              placeholder='Confirm Password'
            />
            <label>Confirm Password</label>
          </div>

          <Button
            disabled={
              !email ||
              !password ||
              !name ||
              !confirmPassword ||
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
            <Link to='/login' className='btn btn-sm btn-outline-primary ml-5'>
              Have an account? Log In
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default RegisterFinalPage
