import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { authentication } from '../firebase'
import { toast } from 'react-toastify'

const initialState = {
  name: 'Markus',
  email: 'markusw880i@hotmail.com',
  password: 'abohassan',
  confirmPassword: 'abohassan',
  buttonText: 'Submit',
}

const RegisterFinalPage = ({ history }) => {
  const [userInfo, setUserInfo] = useState(initialState)

  const { name, email, password, confirmPassword, buttonText } = userInfo

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
      history.push('/')
    } catch (error) {
      setUserInfo({ ...userInfo, buttonText: 'Submit' })
      toast.error(error.message)
    }
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (password !== confirmPassword)
  //     return toast.error('Passwords do not match')
  //   setUserInfo({ ...userInfo, buttonText: 'Submitting' })
  //   axios({
  //     method: 'POST',
  //     url: `${process.env.REACT_APP_API}/register`,
  //     data: { name, email, password },
  //   })
  //     .then((resp) => {
  //       setUserInfo({
  //         ...userInfo,
  //         name: '',
  //         email: '',
  //         password: '',
  //         confirmPassword: '',
  //         buttonText: 'Submitted',
  //       })
  //       toast.success(resp.data.message)
  //     })
  //     .catch((err) => {
  //       setUserInfo({ ...userInfo, buttonText: 'Submit' })
  //       toast.error(err.response.data.error)
  //     })
  // }

  return (
    <div className='container p-5'>
      <div className='col-md-6 offset-md-3'>
        <h1 className='p-5 text-center'>Complete Registration</h1>
        <form>
          <div className='form-group'>
            <label className='text-muted'>Name</label>
            <input
              onChange={handleChange('name')}
              value={name}
              type='text'
              className='form-control'
              autoFocus
            />
          </div>

          <div className='form-group'>
            <label className='text-muted'>Email</label>
            <input
              value={email}
              type='email'
              className='form-control'
              disabled
            />
          </div>

          <div className='form-group'>
            <label className='text-muted'>Password</label>
            <input
              onChange={handleChange('password')}
              value={password}
              type='password'
              className='form-control'
            />
          </div>

          <div className='form-group'>
            <label className='text-muted'>Confirm Password</label>
            <input
              onChange={handleChange('confirmPassword')}
              value={confirmPassword}
              type='password'
              className='form-control'
            />
          </div>

          <div>
            <button
              disabled={
                !email ||
                !password ||
                !name ||
                !confirmPassword ||
                buttonText === 'Submitted' ||
                buttonText === 'Submitting'
              }
              onClick={handleSubmit}
              className='btn btn-primary btn-raised mr-3'
            >
              {buttonText}
            </button>

            <Link
              to='/authentication/forgot-password'
              className='btn btn-sm btn-outline-danger'
            >
              Forgot Password?
            </Link>
          </div>

          <Link to='/login' className='btn btn-sm btn-outline-primary mt-3'>
            Have an account? Log In
          </Link>
        </form>
      </div>
    </div>
  )
}

export default RegisterFinalPage
