import defaultImage from '../images/view.png'
import { FullscreenOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
const { Meta } = Card

const TourCard = ({ tour }) => {
  const { title, overview, images } = tour

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
    </Card>
  )
}

export default TourCard
