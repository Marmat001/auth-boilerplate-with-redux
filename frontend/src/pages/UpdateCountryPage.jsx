import { useState, useEffect } from 'react'
import AdminNavigation from '../components/AdminNavigation'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import { getCountry, updateCountry } from '../helperFunctions/countryFunctions'
import { getContinents } from '../helperFunctions/continentFunctions'
import { toast } from 'react-toastify'

const UpdateCountryPage = ({ history, match }) => {
  const user = useSelector((state) => state.user)

  const [name, setName] = useState('')
  const [buttonText, setButtonText] = useState('Save')
  const [continents, setContinents] = useState([])
  const [parent, setParent] = useState('')

  useEffect(() => {
    importContinents()
    importCountry()
    // eslint-disable-next-line
  }, [])

  const importContinents = () =>
    getContinents().then((c) => setContinents(c.data))

  const importCountry = () =>
    getCountry(match.params.slug).then((c) => {
      setName(c.data.name)
      setParent(c.data.parent)
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    setButtonText('Submitting')

    updateCountry(match.params.slug, { name, parent }, user.token)
      .then((resp) => {
        setName('')
        setButtonText('Submit')
        toast.success(`"${resp.data.name}" has been created!`)
        history.push('/admin/country')
      })
      .catch((error) => {
        setButtonText('Submit')
        if (error.response.status === 400) toast.error(error.response.data)
      })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 text-center'>
          <AdminNavigation />
        </div>
        <div className='col mt-3'>
          <h4>Update Country</h4>

          <div className='form-group'>
            <select
              name='continent'
              className='form-control input-background pl-3'
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Select continent</option>
              {continents.length > 0 &&
                continents.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
            <label className='mt-3'>Choose continent</label>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control input-background p-3'
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
                placeholder='Name of country'
              />
              <label>Name of country</label>
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
        </div>
      </div>
    </div>
  )
}

export default UpdateCountryPage
