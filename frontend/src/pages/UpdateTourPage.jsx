import { useState, useEffect } from 'react'
import AdminNavigation from '../components/AdminNavigation'
import { useSelector } from 'react-redux'
import { getTour, updateTour } from '../helperFunctions/tourFunctions'
import { toast } from 'react-toastify'
import {
  getContinents,
  getContinentsCountries,
} from '../helperFunctions/continentFunctions'
import { LoadingOutlined } from '@ant-design/icons'

import UploadImages from '../components/UploadImages'
import UpdateTourForm from '../components/UpdateTourForm'

const initialState = {
  title: '',
  description: '',
  address: '',
  price: '',
  continent: '',
  country: [],
  images: [],
  startDate: '',
  maxPeople: '',
  duration: '',
  overview: '',
  difficulties: ['Easy', 'Medium', 'Hard', 'Extreme'],
  difficulty: [],
  areaLongitude: '',
  areaLatitude: '',
  startLongitude: '',
  startLatitude: '',
}

const UpdateTourPage = ({ history, match }) => {
  const [tourInfo, setTourInfo] = useState(initialState)
  const [continents, setContinents] = useState([])
  const [countryOptions, setcountryOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [arrOfCountryIds, setArrOfCountryIds] = useState([])
  const [selectedContinent, setSelectedContinent] = useState('')

  const user = useSelector((state) => state.user)

  useEffect(() => {
    importTours()
    importContinents()

    // eslint-disable-next-line
  }, [])

  const importTours = () => {
    getTour(match.params.slug).then((t) => {
      setTourInfo({ ...tourInfo, ...t.data })
      getContinentsCountries(t.data.continent._id).then((resp) => {
        setcountryOptions(resp.data)
      })

      let countryIds = []
      t.data.country.map((c) => countryIds.push(c._id))

      setArrOfCountryIds(countryIds)
    })
  }

  const importContinents = () =>
    getContinents().then((c) => setContinents(c.data))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    tourInfo.country = arrOfCountryIds
    tourInfo.continent = selectedContinent
      ? selectedContinent
      : tourInfo.continent

    updateTour(match.params.slug, tourInfo, user.token)
      .then((resp) => {
        setLoading(false)
        toast.success(`"${resp.data.title}" has been successfully updated!`)
        history.push('/admin/tours')
      })
      .catch((error) => {
        setLoading(false)
        toast.error(error.response.data.error)
      })
  }

  const handleChange = (e) => {
    setTourInfo({ ...tourInfo, [e.target.name]: e.target.value })
  }

  const handleContinentChange = (e) => {
    e.preventDefault()
    setTourInfo({ ...tourInfo, countries: [] })

    setSelectedContinent(e.target.value)

    getContinentsCountries(e.target.value).then((resp) => {
      setcountryOptions(resp.data)
    })
    if (tourInfo.continent._id === e.target.value) {
      importTours()
    }
    setArrOfCountryIds([])
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
              <h1 className='primary-heading'>Update Tour</h1>
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

          <UpdateTourForm
            continents={continents}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            tourInfo={tourInfo}
            setTourInfo={setTourInfo}
            handleContinentChange={handleContinentChange}
            countryOptions={countryOptions}
            arrOfCountryIds={arrOfCountryIds}
            setArrOfCountryIds={setArrOfCountryIds}
            selectedContinent={selectedContinent}
          />
        </div>
      </div>
    </div>
  )
}

export default UpdateTourPage
