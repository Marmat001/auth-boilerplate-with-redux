import { useState, useEffect } from 'react'
import AdminNavigation from '../components/AdminNavigation'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import {
  getContinent,
  updateContinent,
} from '../helperFunctions/continentFunctions'
import { toast } from 'react-toastify'

const UpdateContinentPage = ({ history, match }) => {
  const user = useSelector((state) => state.user)

  const [name, setName] = useState('')
  const [buttonText, setButtonText] = useState('Save')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadContinents()
  }, [])

  const loadContinents = () =>
    getContinent(match.params.slug).then((c) => setName(c.data.name))

  const handleSubmit = (e) => {
    e.preventDefault()
    setButtonText('Submitting')

    updateContinent(match.params.slug, { name }, user.token)
      .then((resp) => {
        setName('')
        setButtonText('Save')
        toast.success(`"${resp.data.name}" has been updated!`)
        history.push('/admin/continent')
      })
      .catch((error) => {
        setButtonText('Save')
        if (error.response.status === 400) toast.error(error.response.data)
      })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 text-center pt-4 nav-border pb-3'>
          <AdminNavigation />
        </div>
        <div className='col mt-3'>
          <h4>Update Continent</h4>

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control input-background p-3'
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
                placeholder='Name'
              />
              <label>Name</label>
              <br />
            </div>

            <Button
              onClick={handleSubmit}
              className='btn btn-primary btn-raised mr-3 mb-3'
              disabled={!name || buttonText === 'Submitting'}
            >
              {buttonText}
            </Button>
          </form>
          <hr />
        </div>
      </div>
    </div>
  )
}

export default UpdateContinentPage
