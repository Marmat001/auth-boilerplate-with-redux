import { useEffect, useState } from 'react'
import TourInfo from '../components/TourInfo'
import { getTour } from '../helperFunctions/tourFunctions'

const TourInfoPage = ({ match }) => {
  const [tour, setTour] = useState({})

  useEffect(() => {
    importTourInfo()
  }, [match.params.slug])

  const importTourInfo = () => {
    getTour(match.params.slug).then((resp) => setTour(resp.data))
  }

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <TourInfo tour={tour} />
      </div>
    </div>
  )
}

export default TourInfoPage
