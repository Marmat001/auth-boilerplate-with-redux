import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCheckout from '../components/StripeCheckout'
import '../stripe.css'
import { Card } from 'antd'

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const PaymentPage = ({ match }) => {
  return (
    <div className='container p-5 text-center'>
      <Card>
        <h2>Complete Booking</h2>
        <Elements stripe={promise}>
          <div className='col-md-8 offset-md-2'>
            <StripeCheckout match={match} Card={Card} />
          </div>
        </Elements>
      </Card>
    </div>
  )
}

export default PaymentPage
