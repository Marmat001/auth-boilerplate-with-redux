import { useState } from 'react'
import UserNavigation from '../components/UserNavigation'
import { Button, Card } from 'antd'
import { toast } from 'react-toastify'
import { authentication } from '../firebase'
import { useSelector } from 'react-redux'
import AdminNavigation from '../components/AdminNavigation'

const initialState = {
  password: 'abohassan',
  confirmPassword: 'abohassan',
  buttonText: 'Submit',
}

const UpdateProfilePage = () => {
  const [userInfo, setUserInfo] = useState(initialState)

  const { password, confirmPassword, buttonText } = userInfo

  const user = useSelector((state) => state.user)

  const handleChange = (name) => (e) => {
    setUserInfo({ ...userInfo, [name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword)
      return toast.error('Passwords do not match')

    setUserInfo({ ...userInfo, buttonText: 'Submitting' })

    await authentication.currentUser
      .updatePassword(password)
      .then(() => {
        setUserInfo({
          ...userInfo,
          password: '',
          confirmPassword: '',
          buttonText: 'Submit',
        })
        toast.success('Password successfully updated!')
      })
      .catch((error) => {
        setUserInfo({ ...userInfo, buttonText: 'Submit' })
        toast.error(error.message)
      })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 text-center pt-4 nav-border'>
          {user.role === 'admin' ? <AdminNavigation /> : <UserNavigation />}
        </div>
        <Card className='col'>
          <div className='text-center mb-5'>
            <h1 className='primary-heading'>Update Profile</h1>
          </div>
          <div className='d-flex'>
            <Card className='col-md-9'>
              <h3>Update Password</h3>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <input
                    type='password'
                    value={password}
                    onChange={handleChange('password')}
                    className='form-control input-background p-3 mb-4'
                    placeholder='Enter new password'
                  />
                  <label>Enter new password</label>
                </div>

                <div className='form-group'>
                  <input
                    type='password'
                    value={confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    className='form-control input-background p-3 mb-4'
                    placeholder='Confirm new password'
                  />
                  <label>Confirm new password</label>
                </div>
              </form>
            </Card>
            <Card className='col-md-3 ml-3 text-center'>
              <h3>Profile Picture</h3>
            </Card>
          </div>

          <div className='text-center'>
            <Button
              onClick={handleSubmit}
              shape='round'
              size='large'
              block
              className='btn btn-primary btn-raised btn w-50 mt-5'
              disabled={
                buttonText === 'Submitting' || !password || !confirmPassword
              }
            >
              {buttonText}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default UpdateProfilePage
