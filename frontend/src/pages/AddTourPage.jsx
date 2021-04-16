import { useState, useEffect } from 'react'
import AdminNavigation from '../components/AdminNavigation'
import { useSelector } from 'react-redux'
import { addTour } from '../helperFunctions/tourFunctions'
import { toast } from 'react-toastify'
import {
  getContinents,
  getContinentsCountries,
} from '../helperFunctions/continentFunctions'
import { LoadingOutlined } from '@ant-design/icons'

import AddTourForm from '../components/AddTourForm'
import UploadImages from '../components/UploadImages'

const initialState = {
  title: '',
  description: '',
  price: '',
  continents: [],
  countries: [],
  images: [],
  startDate: '',
  maxPeople: '',
  duration: '',
  overview: '',
  difficulties: ['Easy', 'Medium', 'Hard', 'Extreme'],
  difficulty: [],
  // locations: [],
}

const AddTourPage = ({ history }) => {
  const [tourInfo, setTourInfo] = useState(initialState)
  const [countryOptions, setcountryOptions] = useState([])
  const [displayCountries, setDisplayCountries] = useState(false)
  const [loading, setLoading] = useState(false)

  const user = useSelector((state) => state.user)

  useEffect(() => {
    importContinents()
  }, [])

  const importContinents = () =>
    getContinents().then((c) =>
      setTourInfo({ ...tourInfo, continents: c.data })
    )

  const handleSubmit = (e) => {
    e.preventDefault()
    addTour(tourInfo, user.token)
      .then((resp) => {
        toast.success(`"${resp.data.title} has been added!"`)
        history.push('/admin/tours')
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.error)
      })
  }

  const handleChange = (e) => {
    setTourInfo({ ...tourInfo, [e.target.name]: e.target.value })
  }

  const handleContinentChange = (e) => {
    e.preventDefault()
    setTourInfo({ ...tourInfo, countries: [], continent: e.target.value })
    getContinentsCountries(e.target.value).then((resp) => {
      setcountryOptions(resp.data)
    })
    setDisplayCountries(true)
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 text-center'>
          <AdminNavigation />
        </div>
        <div className='col mt-3'>
          <div className='text-center'>
            {loading ? (
              <LoadingOutlined className='loading-spinner' />
            ) : (
              <h1 className='primary-heading'>Add Tour</h1>
            )}
          </div>

          <div className='p-3'>
            <UploadImages
              tourInfo={tourInfo}
              setTourInfo={setTourInfo}
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          <AddTourForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            tourInfo={tourInfo}
            setTourInfo={setTourInfo}
            handleContinentChange={handleContinentChange}
            countryOptions={countryOptions}
            displayCountries={displayCountries}
          />
        </div>
      </div>
    </div>
  )
}

export default AddTourPage
