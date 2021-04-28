import { useEffect, useState } from 'react'
import TourCard from '../components/TourCard'
import { getTours, toursAmount } from '../helperFunctions/tourFunctions'
import LoaderCard from '../components/LoaderCard'
import { Pagination } from 'antd'

const LatestAddedTours = () => {
  const [tours, setTours] = useState([])
  const [page, setPage] = useState(1)
  const [toursCount, setToursCount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    importTours()
  }, [page])

  useEffect(() => {
    toursAmount().then((resp) =>
      resp.data >= 6 ? setToursCount(6) : setToursCount(resp.data)
    )
  }, [])

  const importTours = () => {
    setLoading(true)
    getTours('desc', page, 'createdAt').then((resp) => {
      setLoading(false)
      setTours(resp.data)
    })
  }

  return (
    <div className='container'>
      {loading ? (
        <LoaderCard amount={3} />
      ) : (
        <div className='row'>
          {tours.map((tour) => (
            <div className='col-md-4' key={tour._id}>
              <TourCard tour={tour} />
            </div>
          ))}
        </div>
      )}

      <div className='row'>
        <nav className='col-md-4 offset-md-4 text-center pt-5 p-3'>
          <Pagination
            total={(toursCount / 3) * 10}
            onChange={(e) => setPage(e)}
            current={page}
          />
        </nav>
      </div>
    </div>
  )
}

export default LatestAddedTours
