import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllTours } from '../helperFunctions/tourFunctions'
import { LoadingOutlined } from '@ant-design/icons'
import TourCard from '../components/TourCard'

const ShopPage = () => {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    importAllTours()
  }, [])

  const importAllTours = () => {
    setLoading(true)
    getAllTours(12).then((t) => {
      setTours(t.data)
      setLoading(false)
    })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>Filters</div>

        <div className='col-md-9'>
          <div className='col text-center pt-5'>
            {loading ? (
              <LoadingOutlined className='loading-spinner' />
            ) : (
              <h1 className='tours-heading'>Tours</h1>
            )}
          </div>
          {tours.length < 1 && <p>No tours found</p>}

          <div className='row pb-5'>
            {tours.map((t) => (
              <div key={t._id} className='col-md-4 mb-5'>
                <TourCard tour={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
