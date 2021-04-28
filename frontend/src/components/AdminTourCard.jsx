import defaultImage from '../images/view.png'
import {
  FullscreenOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { Button, Card } from 'antd'
import { Link } from 'react-router-dom'
const { Meta } = Card

const TourCard = ({ tour, handleRemoval }) => {
  const { title, overview, images, slug } = tour

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : defaultImage}
          alt={images}
          style={{ height: '250px', objectFit: 'cover' }}
        />
      }
      actions={[
        <Link to={`/admin/tour/${slug}`}>
          <EditOutlined className='text-primary' />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemoval(slug)}
          className='text-danger'
        />,
      ]}
    >
      <Meta className='mb-5' title={title} description={overview} />
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
