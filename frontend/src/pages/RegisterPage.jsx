import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authentication } from '../firebase'

const RegisterPage = () => {
  const [email, setEmail] = useState('markusmatu96@gmail.com')
  const [buttonText, setButtonText] = useState('Submit')

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
    <div className='container p-5'>
      <div className='col-md-6 offset-md-3'>
        <h1 className='p-5 text-center'>Register</h1>

        <form>
          <div className='form-group'>
            <label className='text-muted'>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type='email'
              className='form-control'
            />
          </div>

          <div>
            <button
              disabled={
                !email ||
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

export default RegisterPage
