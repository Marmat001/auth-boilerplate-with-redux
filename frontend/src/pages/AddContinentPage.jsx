import { useState, useEffect } from 'react'
import AdminNavigation from '../components/AdminNavigation'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import {
  getContinents,
  removeContinent,
  addContinent,
} from '../helperFunctions/continentFunctions'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import SearchQuery from '../components/SearchQuery'

const AddContinentPage = () => {
  const user = useSelector((state) => state.user)

  const [name, setName] = useState('')
  const [query, setQuery] = useState('')
  const [buttonText, setButtonText] = useState('Save')
  const [continents, setContinents] = useState([])

  useEffect(() => {
    importContinents()
  }, [])

  const importContinents = () =>
    getContinents().then((c) => setContinents(c.data))

  const handleSubmit = (e) => {
    e.preventDefault()
    setButtonText('Submitting')

    addContinent({ name }, user.token)
      .then((resp) => {
        setName('')
        setButtonText('Submit')
        toast.success(`"${resp.data.name}" has been created!`)
        importContinents()
      })
      .catch((error) => {
        setButtonText('Submit')
        if (error.response.status === 400) toast.error(error.response.data)
      })
  }

  const handleContinentRemoval = async (slug) => {
    if (window.confirm('Are you sure?'))
      removeContinent(slug, user.token)
        .then((resp) => {
          toast.error(`"${resp.data.name}" has been deleted`)
          importContinents()
        })
        .catch((error) => {
          if (error.response.status === 400) toast.error(error.response.data)
        })
  }

  const searchedValue = (query) => (c) => c.name.toLowerCase().includes(query)

  return (
    <div className='container-fluid slide-left'>
      <div className='row'>
        <div className='col-md-2 text-center'>
          <AdminNavigation />
        </div>
        <div className='col mt-3'>
          <div className='text-center'>
            <h1 className='primary-heading'>Add Continent</h1>
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
                placeholder='Name of continent'
              />
              <label>Name of continent</label>
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
          <hr />
          {continents.filter(searchedValue(query)).map((c) => (
            <div className='alert continent-fill w-50' key={c._id}>
              {c.name}
              <span onClick={() => handleContinentRemoval(c.slug)}>
                <DeleteOutlined className='btn btn-danger btn-raised float-right ml-3' />
              </span>
              <Link to={`/admin/continent/${c.slug}`}>
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

export default AddContinentPage
