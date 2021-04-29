import User from '../models/userModel'
import Tour from '../models/tourModel'
import Stripe from 'stripe'
import Order from '../models/orderModel'

const stripe = Stripe(process.env.STRIPE_SECRET)

export const finalizeStripePayment = async (req, res) => {
  const { price } = req.body

 
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(price * 100),
    currency: 'usd',
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
    payable: parseInt(price * 100),
  })
}
