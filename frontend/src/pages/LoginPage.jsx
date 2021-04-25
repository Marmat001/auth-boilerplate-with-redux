import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Card } from 'antd'
import { MailOutlined, GoogleOutlined } from '@ant-design/icons'
import { authentication, googleAuthProvider } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { createUpdateUserInfo } from '../helperFunctions/authFunction'

const initialState = {
  email: 'markusmatu96@gmail.com',
  password: 'abohassan',
  buttonText: 'Log In',
}

const LogInPage = ({ history }) => {
  const dispatch = useDispatch()

  const [userInfo, setUserInfo] = useState(initialState)
  const { email, password, buttonText } = userInfo

  const userDetails = useSelector((state) => state.user)

  useEffect(() => {
    if (userDetails && userDetails.token) history.push('/')
  }, [userDetails, history])

  const handleChange = (name) => (e) => {
    setUserInfo({ ...userInfo, [name]: e.target.value })
  }

  const intended = history.location.state

  const redirectBasedOnRole = (resp) => {
    if (intended) {
      history.push(intended.from)
    } else {
      resp.data.role === 'admin'
        ? history.push('/admin/dashboard')
        : history.push('/user/dashboard')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUserInfo({ ...userInfo, buttonText: 'Submitting' })

    try {
      const response = await authentication.signInWithEmailAndPassword(
        email,
        password
      )

      const { user } = response

      const token = await user.getIdTokenResult()

      createUpdateUserInfo(token.token)
        .then((resp) => {
          dispatch({
            type: 'AUTHENTICATED_USER',
            payload: {
              email: resp.data.email,
              name: resp.data.name,
              token: token.token,
              _id: resp.data._id,
              role: resp.data.role,
            },
          })
          redirectBasedOnRole(resp)
        })
        .catch((error) => console.log(error))
    } catch (error) {
      setUserInfo({ ...userInfo, buttonText: 'Log In' })
      toast.error(error.message)
    }
  }

  const handleGoogleLogin = async () => {
    authentication
      .signInWithPopup(googleAuthProvider)
      .then(async (resp) => {
        const { user } = resp

        const token = await user.getIdTokenResult()

        createUpdateUserInfo(token.token)
          .then((resp) => {
            dispatch({
              type: 'AUTHENTICATED_USER',
              payload: {
                email: resp.data.email,
                name: resp.data.name,
                token: token.token,
                _id: resp.data._id,
                role: resp.data.role,
              },
            })
            redirectBasedOnRole(resp)
          })

          .catch((error) => console.log(error))
      })
      .catch((error) => {
        setUserInfo({ ...userInfo, buttonText: 'Log In' })
        toast.error(error.message)
      })
  }

  return (
    <div className='col-md-6 offset-md-3 p-5'>
      <Card>
        <h1 className='pt-5 text-center'>Log In</h1>
        <form onSubmit={handleSubmit} className='form-background p-4'>
          <div className='form-group'>
            <input
              onChange={handleChange('email')}
              value={email}
              type='email'
              className='form-control input-background p-3'
              placeholder='Email'
              autoFocus
            />
            <label>Email</label>
          </div>

          <div className='form-group'>
            <input
              onChange={handleChange('password')}
              value={password}
              type='password'
              className='form-control input-background p-3 mb-4'
              placeholder='Password'
            />
            <label>Password</label>
          </div>

          <div>
            <Button
              onClick={handleSubmit}
              shape='round'
              className='btn btn-primary btn-raised btn mr-3 mb-3'
              block
              icon={<MailOutlined />}
              size='large'
              disabled={
                !email || password.length < 6 || buttonText === 'Submitting'
              }
            >
              {buttonText}
            </Button>

            <Button
              onClick={handleGoogleLogin}
              shape='round'
              className='btn btn-raised btn mr-3 mb-4'
              block
              type='danger'
              icon={<GoogleOutlined />}
              size='large'
              disabled={buttonText === 'Submitting'}
            >
              {buttonText === 'Submitting' ? buttonText : 'Log In With Google'}
            </Button>

            <div className='d-flex justify-content-center align-items-center'>
              <Link
                to='/authentication/forgot-password'
                className='btn btn-sm btn-outline-danger mr-3'
              >
                Forgot Password?
              </Link>

              <Link to='/register' className='btn btn-sm btn-outline-primary'>
                New customer? Register
              </Link>
            </div>
          </div>
        </form>
        <br />
      </Card>
    </div>
  )
}

export default LogInPage
