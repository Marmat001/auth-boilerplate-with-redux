import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'
import { createStripeIntent } from '../helperFunctions/stripeFunctions'
import { Link } from 'react-router-dom'
import { DollarOutlined } from '@ant-design/icons'
import { getTour } from '../helperFunctions/tourFunctions'
import defaultImage from '../images/view.png'
import { createOrder } from '../helperFunctions/authFunction'
import { toast } from 'react-toastify'
import { LoadingOutlined } from '@ant-design/icons'

const StripeCheckout = ({ match, Card }) => {
  const user = useSelector((state) => state.user)

  const [fullfilled, setFullfilled] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [processing, setProcessing] = useState('')
  const [error, setError] = useState(null)
  const [tour, setTour] = useState({})
  const [loading, setLoading] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const { images } = tour

  const paymentInfo = useSelector((state) => state.payment)
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

  useEffect(() => {
    createStripeIntent(user.token, paymentInfo.price, match.params.slug).then(
      (resp) => {
        setClientSecret(resp.data.clientSecret)
      }
    )
  }, [user.token, paymentInfo.price, match.params.slug])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      createOrder(user.token, payload, match.params.slug)
      setProcessing(false)
      setError(null)
      setFullfilled(true)
      toast.success('Payment successful!')
    }
  }

  const handleChange = async (e) => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : '')
  }

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }

  return (
    <>
      {loading ? (
        <div className='col text-center'>
          <LoadingOutlined className='loading-spinner' />
        </div>
      ) : (
        <>
          <div className='text-center pb-5'>
            <Card
              cover={
                <img
                  src={images && images.length ? images[3].url : defaultImage}
                  alt='tour-cover'
                  style={{
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '20px',
                    marginBottom: '-50px',
                  }}
                />
              }
              actions={[
                <div className='tertiary-heading'>
                  <DollarOutlined className='text-info' /> <br /> Total: ${' '}
                  {paymentInfo.price}
                </div>,
              ]}
            />

            <h5 className='mt-4 text-primary'>
              For testing purpose, try using this credit card number "4242 4242
              4242 4242" with MM and YY being any future date
            </h5>
          </div>
          <form
            id='payment-form'
            className='stripe-form'
            onSubmit={handleSubmit}
          >
            <CardElement
              id='card-element'
              options={cardStyle}
              onChange={handleChange}
            />

            <button
              className='stripe-button'
              disabled={processing || disabled || fullfilled}
            >
              <span id='button-text'>
                {processing ? (
                  <div className='spinner' id='spinner'></div>
                ) : (
                  'Pay'
                )}
              </span>
            </button>
            <br />

            {error && (
              <div className='card-error' role='alert'>
                {error}
              </div>
            )}
          </form>
          <h4
            className={fullfilled ? 'result-message' : 'result-message hidden'}
          >
            Payment Successful.{' '}
            {userInfo && userInfo.role === 'admin' ? (
              <Link to='/admin/dashboard'>See it in your dashboard.</Link>
            ) : (
              <Link to='/user/dashboard'>See it in your dashboard.</Link>
            )}
          </h4>
        </>
      )}
    </>
  )
}

export default StripeCheckout
