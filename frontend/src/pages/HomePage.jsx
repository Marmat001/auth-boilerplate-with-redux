import { LoadingOutlined } from '@ant-design/icons'
import ContinentList from '../components/ContinentList'
import CountryList from '../components/CountryList'
import LatestAddedTours from '../components/LatestAddedTours'
import MostBookedTours from '../components/MostBookedTours'
import { Footer } from 'antd/lib/layout/layout'

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

      <h4 className='text-center p-3 display-4 mb-5 mt-5 jumbotron'>
        Continents
      </h4>

      <ContinentList />

      <h4 className='text-center p-3 display-4 mb-5 mt-5 jumbotron'>
        Countries
      </h4>

      <CountryList />

      <Footer>hello YEYEYEYEYYEYEYEYEYEYEYEYYEYE</Footer>
    </>
  )
}

export default HomePage
