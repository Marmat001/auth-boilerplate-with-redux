import defaultImage from '../images/view.png'
import { FullscreenOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Button, Card } from 'antd'
const { Meta } = Card

const TourCard = ({ tour }) => {
  const { title, overview, images, slug } = tour

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : defaultImage}
          style={{ height: '250px', objectFit: 'cover' }}
        />
      }
    >
      <Meta className='mb-5' title={title} description={overview} />
      <Link to={`/tour/${slug}`}>
        <Button
          shape='round'
          className='btn btn-raised btn'
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
