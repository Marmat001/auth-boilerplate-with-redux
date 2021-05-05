import ContinentList from '../components/ContinentList'
import CountryList from '../components/CountryList'
import LatestAddedTours from '../components/LatestAddedTours'
import MostBookedTours from '../components/MostBookedTours'
import { Footer } from 'antd/lib/layout/layout'
import Logo from '../images/icon.svg'

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

      <Footer className='pl-0 pr-0'>
        <hr className='btn-outline-secondary mb-5' />

        <div className='d-flex align-items-center'>
          <hr className='btn-outline-secondary w-25' />

          <div className='text-center'>
            <img alt='logo' src={Logo} />
            <h3 className='mt-3 mb-5'>
              <span>&#169; Tourify</span>
            </h3>
          </div>
          <hr className='btn-outline-secondary w-25' />
        </div>
      </Footer>
    </>
  )
}

export default HomePage
