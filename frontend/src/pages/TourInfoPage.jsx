import { useEffect, useState } from 'react'
import TourCard from '../components/TourCard'
import TourInfo from '../components/TourInfo'
import { getRelatedTours, getTour } from '../helperFunctions/tourFunctions'
import { LoadingOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addTourToWishlist, getWishlist } from '../helperFunctions/authFunction'

const TourInfoPage = ({ match, history }) => {
  const userInfo = useSelector((state) => state.user)

  const [tour, setTour] = useState({})
  const [loading, setLoading] = useState(false)
  const [relatedTours, setRelatedTours] = useState([])

  useEffect(() => {
    importTourInfo()
  }, [match.params.slug])

  const importTourInfo = () => {
    setLoading(true)
    getTour(match.params.slug).then((resp) => {
      setTour(resp.data)
      getRelatedTours(resp.data._id).then((resp) => setRelatedTours(resp.data))
      setLoading(false)
    })
  }

  const handleClick = (e) => {
    if (!userInfo || !userInfo.token) {
      history.push({
        pathname: '/login',
        state: { from: `/tour/${match.params.slug}` },
      })
    } else {
      history.push(`/checkout/${match.params.slug}`)
    }
  }

  const handleAddToWishlist = (e) => {
    if (!userInfo || !userInfo.token) {
      history.push({
        pathname: '/login',
        state: { from: `/tour/${match.params.slug}` },
      })
    } else {
      addTourToWishlist(tour._id, userInfo.token).then((resp) => {
        toast.success('Successfully added to wishlist!')
        history.push('/user/wishlist')
      })
    }
  }

  return (
    <div className='container-fluid'>
      {loading && (
        <div className='text-center pt-5'>
          <LoadingOutlined className='loading-spinner' />
        </div>
      )}
      {!loading && (
        <>
          <div className='row pt-4'>
            <TourInfo
              handleClick={handleClick}
              handleAddToWishlist={handleAddToWishlist}
              userInfo={userInfo}
              tour={tour}
            />
          </div>
          <div className='row'>
            <div className='col text-center pt-5 pb-5'>
              <hr className='btn-outline-secondary' />
              <h4 className='tertiary-heading'>
                Other tours in {tour.continent?.name}
              </h4>
              <hr className='btn-outline-secondary' />
            </div>
          </div>
          <div className='row pb-5'>
            {relatedTours.length ? (
              relatedTours.map((rt) => (
                <div className='col-md-4' key={rt._id}>
                  <TourCard tour={rt} />
                </div>
              ))
            ) : (
              <div className='col text-center tertiary-heading'>
                No related tours found
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default TourInfoPage
