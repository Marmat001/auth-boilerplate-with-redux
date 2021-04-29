import axios from 'axios'

export const createStripeIntent = (token, price) =>
  axios.post(
    `${process.env.REACT_APP_API}/finalize-stripe-payment`,
    {price},
    {
      headers: {
        token,
      },
    }
  )
