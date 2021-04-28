import defaultImage from '../images/view.png'
import { FullscreenOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Button, Card } from 'antd'
const { Meta } = Card

const TourCard = ({ tour }) => {
  const { title, overview, images, slug, country, price } = tour

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : defaultImage}
          alt={images}
          style={{ height: '250px', objectFit: 'cover' }}
        />
      }
    >
      <Meta
        className='mb-3'
        title={`${title} - $${price}`}
        description={overview}
      />
      <div className='p-1 mb-3 text-center'>
        <h4>{tour.country[0].name}</h4>
      </div>

      <Link to={`/tour/${slug}`}>
        <Button
          shape='round'
          className='btn btn-raised'
          block
          type='primary'
          icon={<FullscreenOutlined />}
          size='large'
        >
          VIEW DETAILS
        </Button>
      </Link>
    </Card>
  )
}

export default TourCard
