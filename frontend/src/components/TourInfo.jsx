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
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Button, Card } from 'antd'
const { Meta } = Card

const TourInfo = ({ tour }) => {
  const {
    title,
    description,
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
  } = tour

  console.log(tour)

  return (
    <>
      <div className='container-fluid'>
        <div className='position-relative'>
          <div className='tour-background d-flex flex-column justify-content-center align-items-center'>
            <h1 className='secondary-heading'>{title}</h1>
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

            <div className='d-flex align-items-center pb-3'>
              <DollarOutlined
                style={{ color: '#2edea0' }}
                className='h1 mr-3 mb-3'
              />
              <h4 className='pr-3 facts'>PRICE</h4>
              <h5 className='facts'>{price} USD</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TourInfo
