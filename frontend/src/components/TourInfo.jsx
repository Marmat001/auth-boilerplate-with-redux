import { useState, useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
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
import { getWishlist } from '../helperFunctions/authFunction'

const { TabPane } = Tabs

const TourInfo = ({ tour, handleClick, userInfo, handleAddToWishlist }) => {
  const {
    title,
    description,
    address,
    images,
    difficulty,
    duration,
    country,
    continent,
    overview,
    startDate,
    maxPeople,
    areaLatitude,
    areaLongitude,
    startLatitude,
    startLongitude,
  } = tour

  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    importWishlist()

    return () => {
      setWishlist([])
    }
    // eslint-disable-next-line
  }, [userInfo])

  const importWishlist = () => {
    if (userInfo) {
      getWishlist(userInfo.token).then((resp) => {
        setWishlist(resp.data.wishlist)
      })
    }
  }

  const wishlistedTours = wishlist.map((t) => t.title)
  const currentTourInWishlist = wishlistedTours.includes(title)

  return (
    <>
      <div className='container-fluid'>
        <div className='position-relative'>
          <div className='tour-background d-flex flex-column justify-content-center align-items-center'>
            <Card>
              <h1 className='tours-heading text-center'>{title}</h1>
              <div className='d-flex justify-content-center align-items-center text-center'>
                <div className='mr-5'>
                  <FieldTimeOutlined className='primary-heading mb-3' />
                  <h4>
                    {duration} {duration < 2 ? 'DAY' : 'DAYS'}
                  </h4>
                </div>

                <div className='ml-5'>
                  <EnvironmentOutlined className='primary-heading mb-3' />
                  <h4>
                    {continent && continent.name.toUpperCase()},{' '}
                    {country && country[0].name.toUpperCase()}
                  </h4>
                </div>
              </div>
              <div className='pt-4'>
                <h4>{overview}</h4>
              </div>
            </Card>
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
              images.map((img) => (
                <img alt='tour-covers' src={img.url} key={img.public_id} />
              ))}
          </Carousel>
        </Card>
      </div>

      <div className='col-md-6 pt-5'>
        <h1 className='tertiary-heading text-center'>
          ABOUT {title?.toUpperCase()}
        </h1>
        <p className='pb-5'>{description}</p>

        <div className='d-flex facts-container justify-content-center'>
          <div>
            <h1 className='tertiary-heading text-center pt-5 pb-3'>
              QUICK INFORMATION
            </h1>
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
                  <div onClick={handleClick} className='h6 pt-2 text-info'>
                    {userInfo && userInfo.token
                      ? 'Proceed to booking'
                      : 'Login to book now'}
                  </div>
                </>,
                <p
                  onClick={handleAddToWishlist}
                  className={`h6 pt-2 ${
                    currentTourInWishlist ? 'text-primary' : 'text-info'
                  }`}
                >
                  <HeartOutlined className='pr-2' />
                  {currentTourInWishlist
                    ? 'Already wishlisted'
                    : userInfo && userInfo.token
                    ? 'Add to wishlist'
                    : 'Login to wishlist'}
                </p>,
              ]}
            >
              <TourInfoSummary tour={tour} />
            </Card>
          </TabPane>
          <TabPane tab='Contact' key='2'>
            <Card style={{ height: '405px' }}>
              Call us at XXXX XXXX XXXX or email us at XXXX@gmail.com to learn
              more about this tour
            </Card>
          </TabPane>
        </Tabs>
      </div>

      <div className='col-md-12 p-5'>
        {/* <Card> */}
          <Mapbox
            address={address}
            startLatitude={startLatitude}
            startLongitude={startLongitude}
            areaLatitude={areaLatitude}
            areaLongitude={areaLongitude}
          />
        {/* </Card> */}
      </div>
    </>
  )
}

export default TourInfo
