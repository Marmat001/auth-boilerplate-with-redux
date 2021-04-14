import { useState, useEffect } from 'react'
import AdminNavigation from '../components/AdminNavigation'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import {
  getCountries,
  removeCountry,
  addCountry,
} from '../helperFunctions/countryFunctions'
import { getContinents } from '../helperFunctions/continentFunctions'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import SearchQuery from '../components/SearchQuery'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const AddCountryPage = () => {
  const user = useSelector((state) => state.user)

  const [name, setName] = useState('')
  const [query, setQuery] = useState('')
  const [buttonText, setButtonText] = useState('Save')
  const [continents, setContinents] = useState([])
  const [continent, setContinent] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    importContinents()
    importCountries()
  }, [])

  const importContinents = () =>
    getContinents().then((c) => setContinents(c.data))

  const importCountries = () => getCountries().then((c) => setCountries(c.data))

  const handleSubmit = (e) => {
    e.preventDefault()
    setButtonText('Submitting')

    addCountry({ name, parent: continent }, user.token)
      .then((resp) => {
        setName('')
        setButtonText('Submit')
        toast.success(`"${resp.data.name}" has been created!`)
        importCountries()
      })
      .catch((error) => {
        setButtonText('Submit')
        if (error.response.status === 400) toast.error(error.response.data)
      })
  }

  const handleContinentRemoval = async (slug) => {
    if (window.confirm('Are you sure?'))
      removeCountry(slug, user.token)
        .then((resp) => {
          toast.error(`"${resp.data.name}" has been deleted`)
          importCountries()
        })
        .catch((error) => {
          if (error.response.status === 400) toast.error(error.response.data)
        })
  }

  const searchedValue = (query) => (c) => c.name.toLowerCase().includes(query)

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 text-center pt-4 nav-border pb-3'>
          <AdminNavigation />
        </div>
        <div className='col mt-3'>
          <div className='text-center'>
            <h1 className='primary-heading'>Add Country</h1>
          </div>

          <div className='form-group'>
            <select
              name='continent'
              className='form-control input-background pl-3'
              onChange={(e) => setContinent(e.target.value)}
            >
              <option>Select continent</option>
              {continents.length > 0 &&
                continents.map((c) => (
                  <option key={c._id} value={c._id}>
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

          <SearchQuery query={query} setQuery={setQuery} />

          {countries.filter(searchedValue(query)).map((c) => (
            <div className='alert continent-fill w-50' key={c._id}>
              {c.name}
              <span onClick={() => handleContinentRemoval(c.slug)}>
                <DeleteOutlined className='btn btn-danger btn-raised float-right ml-3' />
              </span>
              <Link to={`/admin/country/${c.slug}`}>
                <span>
                  <EditOutlined className='btn btn-primary btn-raised float-right' />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddCountryPage
