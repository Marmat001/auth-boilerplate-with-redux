import { useState, useEffect } from 'react'
import { getContinent } from '../helperFunctions/continentFunctions'
import { LoadingOutlined } from '@ant-design/icons'
import TourCard from '../components/TourCard'

const ContinentHomePage = ({ match }) => {
  const [continent, setContinent] = useState({})
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getContinent(match.params.slug).then((resp) => {
      setContinent(resp.data.continent)
      setTours(resp.data.tours)
      setLoading(false)
    })
  }, [])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col text-center pt-5'>
          {loading ? (
            <LoadingOutlined className='loading-spinner' />
          ) : (
            <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
              {tours.length} {tours.length === 1 ? 'Tour in' : 'Tours in'} "
              {continent.name}"
            </h4>
          )}
        </div>
      </div>

      <div className='row'>
        {tours.map((t) => (
          <div className='col pb-5' key={t._id}>
            <TourCard tour={t} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContinentHomePage
