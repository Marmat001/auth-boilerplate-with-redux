import User from '../models/userModel'
import Tour from '../models/tourModel'
import Stripe from 'stripe'
import Order from '../models/orderModel'

const stripe = Stripe(process.env.STRIPE_SECRET)

export const stripeSessionId = async (req, res) => {
  const { hotelId } = req.body

  const item = await Hotel.findById(hotelId).populate('postedBy').exec()

  const fee = (item.price * 20) / 100

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],

    line_items: [
      {
        name: item.title,
        amount: item.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],

    payment_intent_data: {
      application_fee_amount: fee * 100,
      transfer_data: {
        destination: item.postedBy.stripe_account_id,
      },
    },

    success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
    cancel_url: process.env.STRIPE_CANCEL_URL,
  })

  await User.findByIdAndUpdate(req.user._id, { stripeSession: session }).exec()
  res.send({
    sessionId: session.id,
  })
}

export const stripeSuccess = async (req, res) => {
  try {
    const { hotelId } = req.body
    const user = await User.findById(req.user._id).exec()
    if (!user.stripeSession) return
    const session = await stripe.checkout.sessions.retrieve(
      user.stripeSession.id
    )
    if (session.payment_status === 'paid') {
      const orderExist = await Order.findOne({
        'session.id': session.id,
      }).exec()
      if (orderExist) {
        res.json({ success: true })
      } else {
        let newOrder = await new Order({
          hotel: hotelId,
          session,
          orderedBy: user._id,
        }).save()
        await User.findByIdAndUpdate(user._id, {
          $set: { stripeSession: {} },
        })
        res.json({ success: true })
      }
    }
  } catch (error) {
    console.log('STRIPE SUCCESS ERROR', error)
  }
}
