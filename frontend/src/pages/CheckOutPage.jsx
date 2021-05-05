import { useEffect, useState } from 'react'
import { getTour } from '../helperFunctions/tourFunctions'
import { applyCoupon } from '../helperFunctions/couponFunctions'
import { LoadingOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

const CheckOutPage = ({ match, history }) => {
  const [tour, setTour] = useState({})
  const [coupon, setCoupon] = useState('')
  const [couponInfo, setCouponInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [totalAmountAfterDiscount, setTotalAmountAfterDiscount] = useState(0)
  const [couponError, setCouponError] = useState('')

  const dispatch = useDispatch()

  const { images, title, price, address, country, startDate, slug } = tour

  const userInfo = useSelector((state) => state.user)

  useEffect(() => {
    importTourInfo()
    // eslint-disable-next-line
  }, [match.params.slug])

  const importTourInfo = () => {
    setLoading(true)
    getTour(match.params.slug).then((resp) => {
      setTour(resp.data)
      setLoading(false)
    })
  }

  const handleApplyCoupon = () => {
    applyCoupon(coupon, userInfo.token).then((resp) => {
      if (resp.data.discount) {
        setCouponInfo(resp.data)
        setTotalAmountAfterDiscount(
          price - ((price * resp.data.discount) / 100).toFixed(0)
        )
        dispatch({
          type: 'PAYMENT_HANDLER',
          payload: { price: totalAmountAfterDiscount },
        })
      }
      if (resp.data.error) {
        setCouponError(resp.data.error)

        dispatch({
          type: 'PAYMENT_HANDLER',
          payload: { price },
        })
      }
    })
  }

  const handleBooking = (e) => {
    e.preventDefault()
    history.push(`/payment/${slug}`)
    dispatch({
      type: 'PAYMENT_HANDLER',
      payload: {
        price: totalAmountAfterDiscount > 0 ? totalAmountAfterDiscount : price,
      },
    })

    window.localStorage.setItem(
      'paymentStatus',
      totalAmountAfterDiscount > 0 ? totalAmountAfterDiscount : price
    )
  }

  return (
    <div className='col-md-6 offset-md-3 pt-5'>
      {loading ? (
        <div className='text-center'>
          <LoadingOutlined className='loading-spinner text-center' />
        </div>
      ) : (
        <div className='row'>
          <div className='col'>
            {images && (
              <img
                src={images[0].url}
                alt={title}
                className='mb-3 w-100 h-25'
                style={{ borderRadius: '10px', objectFit: 'cover' }}
              />
            )}
            <h4 className='text-center tertiary-heading'>{title}</h4>
            <br />
            <br />
            <h4 className='text-primary'>
              Try out coupon "20212021" for 20% off!
            </h4>
            <br />
            <h4>Discount Coupon</h4>
            <br />
            <input
              onChange={(e) => {
                setCouponError('')
                setCoupon(e.target.value)
              }}
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
            <br />
            {couponError && (
              <p className='bg-danger p-2 mt-2 mb-4'>{couponError}</p>
            )}
            <hr className='btn-outline-secondary mb-5' />
            <h3>Payment / Information Summary</h3>
            <br />

            {totalAmountAfterDiscount > 0 ? (
              <h5 className='bg-success p-2'>
                Discount Applied: Total Cost: {totalAmountAfterDiscount}$ (
                {couponInfo.discount} % OFF)
              </h5>
            ) : (
              <h5>Total Cost: ${price}</h5>
            )}

            {country && (
              <h5>
                Start Location: {address}, {country[0].name}
              </h5>
            )}
            <h5>
              Start Date: {moment(new Date(startDate)).format('MMMM Do YYYY')}
            </h5>
            <Button
              shape='round'
              className='btn btn-raised btn-outline-info btn mt-5 mb-5'
              block
              onClick={handleBooking}
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
