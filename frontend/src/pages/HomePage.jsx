import { LoadingOutlined } from '@ant-design/icons'
import LatestAddedTours from '../components/LatestAddedTours'
import MostBookedTours from '../components/MostBookedTours'

const HomePage = () => {
  return (
    <>
      <h4 className='text-center p-3 display-4 mb-5 mt-5 jumbotron'>
        New Tours
      </h4>

      <LatestAddedTours />

      <br />

      <h4 className='text-center p-3 display-4 mb-5 mt-5 jumbotron'>
        Most Booked Tours
      </h4>

      <MostBookedTours />
    </>
  )
}

export default HomePage
