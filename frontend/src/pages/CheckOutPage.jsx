import { useEffect, useState } from 'react'
import { getTour } from '../helperFunctions/tourFunctions'
import { applyCoupon } from '../helperFunctions/couponFunctions'
import { LoadingOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const CheckOutPage = ({ match }) => {
  const [tour, setTour] = useState({})
  const [coupon, setCoupon] = useState('')
  const [loading, setLoading] = useState(false)

  const { images, title, price, address, country, startDate } = tour

  const userInfo = useSelector((state) => state.user)

  useEffect(() => {
    importTourInfo()
  }, [match.params.slug])

  const importTourInfo = () => {
    setLoading(true)
    getTour(match.params.slug).then((resp) => {
      setTour(resp.data)
      setLoading(false)
    })
  }

  const handleApplyCoupon = () => {
    try {
      applyCoupon(coupon, userInfo.token)
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <div className='container-fluid'>
      {loading ? (
        <div className='text-center pt-5'>
          <LoadingOutlined className='loading-spinner text-center' />
        </div>
      ) : (
        <div className='row'>
          <div className='col-md-6 offset-3 pt-5'>
            {images && (
              <img
                src={images[0].url}
                alt={title}
                className='mb-3 w-100 h-50'
                style={{ borderRadius: '10px' }}
              />
            )}
            <h4 className='text-center'>{title}</h4>
            <br />
            <br />
            <h4>Discount Coupon</h4>
            <br />
            <input
              onChange={(e) => setCoupon(e.target.value)}
              value={coupon}
              type='text'
              className='form-control input-background p-3 mb-3'
              placeholder='Write your coupon here'
            />
            <Button
              onClick={handleApplyCoupon}
              className='btn btn-outline-info'
            >
              Apply Coupon
            </Button>
            <hr className='btn-outline-secondary mb-5' />
            <h4>Payment / Information Summary</h4>
            <br />
            <h6>Total Cost: ${price}</h6>
            {country && (
              <h6>
                Start Location: {address}, {country[0].name}
              </h6>
            )}
            <h6>
              Start Date: {moment(new Date(startDate)).format('MMMM Do YYYY')}
            </h6>
            <Button
              shape='round'
              className='btn btn-raised btn-outline-info btn mt-5 mb-5'
              block
            >
              Book Now
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckOutPage
