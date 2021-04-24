import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
  FieldTimeOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  RiseOutlined,
  UsergroupAddOutlined,
  DollarOutlined,
  HeartOutlined,
} from '@ant-design/icons'
import { Card, Tabs } from 'antd'
import Mapbox from './Mapbox'
import TourInfoSummary from './TourInfoSummary'

const { TabPane } = Tabs

const TourInfo = ({ tour }) => {
  const {
    title,
    description,
    address,
    images,
    slug,
    difficulty,
    duration,
    country,
    continent,
    overview,
    startDate,
    maxPeople,
    price,
    areaLatitude,
    areaLongitude,
    startLatitude,
    startLongitude,
  } = tour

  return (
    <>
      <div className='container-fluid'>
        <div className='position-relative'>
          <div className='tour-background d-flex flex-column justify-content-center align-items-center'>
            <h1 className='title-heading'>{title}</h1>
            <div className='d-flex w-25 justify-content-around'>
              <div className='d-flex align-items-center'>
                <FieldTimeOutlined className='primary-heading h1 mr-3 mb-3' />
                <h5>
                  {duration} {duration < 2 ? 'DAY' : 'DAYS'}
                </h5>
              </div>

              <div className='d-flex align-items-center'>
                <EnvironmentOutlined className='primary-heading h1 mr-3 mb-3' />
                <h5>
                  {continent && continent.name.toUpperCase()},{' '}
                  {country && country[0].name.toUpperCase()}
                </h5>
              </div>
            </div>
            <h4 className='pt-5'>{overview}</h4>
          </div>
          {images && (
            <img
              src={images[0].url}
              alt={title}
              className='mb-5 w-100 tour-cover'
            />
          )}
        </div>
      </div>
      <div className='col-md-6 pt-5'>
        <Card>
          <Carousel showArrows={true} infiniteLoop autoPlay>
            {images &&
              images.map((img) => <img src={img.url} key={img.public_id} />)}
          </Carousel>
        </Card>
      </div>

      <div className='col-md-6 pt-5'>
        <h1 className='tertiary-heading text-center'>ABOUT THE {title}</h1>
        <p className='pb-5'>{description}</p>

        <div className='d-flex justify-content-center'>
          <div>
            <h1 className='tertiary-heading pt-5 pb-3'>QUICK INFORMATION</h1>
            <div className='d-flex align-items-center pb-3'>
              <CalendarOutlined
                style={{ color: '#2edea0' }}
                className='h1 mr-3 mb-3'
              />
              <h4 className='pr-3 facts'>NEXT DATE</h4>
              <h5 className='facts'>
                {moment(new Date(startDate)).format('MMMM Do YYYY')}
              </h5>
            </div>

            <div className='d-flex align-items-center pb-3'>
              <RiseOutlined
                style={{ color: '#2edea0' }}
                className='h1 mr-3 mb-3'
              />
              <h4 className='pr-3 facts'>DIFFICULTY</h4>
              <h5 className='facts'>{difficulty?.toUpperCase()}</h5>
            </div>

            <div className='d-flex align-items-center pb-3'>
              <UsergroupAddOutlined
                style={{ color: '#2edea0' }}
                className='h1 mr-3 mb-3'
              />
              <h4 className='pr-3 facts'>ATTENDANTS</h4>
              <h5 className='facts'>{maxPeople} PEOPLE</h5>
            </div>

            <div className='d-flex align-items-center pb-5'>
              <DollarOutlined
                style={{ color: '#2edea0' }}
                className='h1 mr-3 mb-3'
              />
              <h4 className='pr-3 facts'>30 DAY MONEY BACK GUARANTEE</h4>
            </div>
          </div>
        </div>

        <Tabs type='card'>
          <TabPane tab='Information' key='1'>
            <Card
              actions={[
                <>
                  <Link className='h6 text-info'>Book Now</Link>{' '}
                  {/*kolla hur du gjorde i vacationeer för att d ska stå "log in too book om den inte e inloggad, samt att man kommer tbx på samma sida efter" */}
                </>,
                <Link className='h6 text-info'>
                  <HeartOutlined className='pr-2' />
                  Add to wishlist
                </Link>,
              ]}
            >
              <TourInfoSummary tour={tour} />
            </Card>
          </TabPane>
          <TabPane tab='Contact' key='2'>
            <Card style={{ height: '397px' }}>
              Call us at XXXX XXXX XXXX or email us at XXXX@gmail.com to learn
              more about this tour
            </Card>
          </TabPane>
        </Tabs>
      </div>

      <div className='col-md-12 p-5'>
        <Card>
          <Mapbox
            address={address}
            startLatitude={startLatitude}
            startLongitude={startLongitude}
            areaLatitude={areaLatitude}
            areaLongitude={areaLongitude}
          />
        </Card>
      </div>
    </>
  )
}

export default TourInfo
