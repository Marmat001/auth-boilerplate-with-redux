import { useEffect, useState } from 'react'
import AdminNavigation from '../components/AdminNavigation'
import { getAllTours, removeTours } from '../helperFunctions/tourFunctions'
import { LoadingOutlined } from '@ant-design/icons'
import TourCard from '../components/AdminTourCard'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const ToursPage = () => {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(false)

  const user = useSelector((state) => state.user)

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

  const handleRemoval = (slug) => {
    if (window.confirm('Are you sure?')) {
      removeTours(slug, user.token)
        .then((resp) => {
          importAllTours()
          toast.error(`"${resp.data.title}" has been deleted successfully`)
        })
        .catch((error) => {
          if (error.response.status === 400) toast.error(error.response.data)
        })
    }
  }

  console.log(tours)
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
              <h1 className='primary-heading'>All Tours</h1>
            )}
          </div>
          <div className='row'>
            {tours.map((tour) => (
              <div key={tour._id} className='col-md-4 pb-5'>
                <TourCard tour={tour} handleRemoval={handleRemoval} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToursPage
