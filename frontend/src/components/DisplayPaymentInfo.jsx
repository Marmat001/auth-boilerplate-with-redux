import React from 'react'

const DisplayPaymentInfo = ({ order }) => (
  <div>
    <p className='paymentinfo-heading'>
      <span>Order ID: {order.paymentIntent.id}</span> <br />
      <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span> <br />
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span> <br />
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
      <br />
      <span>
        Ordered on:{' '}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      <br />
      <span className='badge bg-primary text-white'>
        STATUS: {order.orderStatus}
      </span>
    </p>
  </div>
)

export default DisplayPaymentInfo
