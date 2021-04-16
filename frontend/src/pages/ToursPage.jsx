import { useEffect, useState } from 'react'
import AdminNavigation from '../components/AdminNavigation'
import { getAllTours } from '../helperFunctions/tourFunctions'
import { LoadingOutlined } from '@ant-design/icons'
import TourCard from '../components/TourCard'

const ToursPage = () => {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    importAllTours()
  }, [])

  const importAllTours = () => {
    setLoading(true)
    getAllTours(50)
      .then((resp) => {
        setLoading(false)
        setTours(resp.data)
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 text-center pt-4 nav-border pb-3'>
          <AdminNavigation />
        </div>

        <div className='col mt-3'>
          <div className='text-center'>
            {loading ? (
              <LoadingOutlined className='loading-spinner' />
            ) : (
              <h1 className='primary-heading'>All Tours</h1>
            )}
          </div>
          <div className='row'>
            {tours.map((tour) => (
              <div key={tour._id} className='col-md-4 pb-5'>
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToursPage
