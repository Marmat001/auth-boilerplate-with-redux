import User from '../models/userModel'
import Coupon from '../models/couponModel'
import Order from '../models/orderModel'
import Tour from '../models/tourModel'

export const createOrUpdate = async (req, res) => {
  const { email, picture, name } = req.user

  const currentUser = await User.findOneAndUpdate(
    { email },
    { name: email.split('@')[0], picture },
    { new: true }
  )

  if (currentUser) {
    res.json(currentUser)
  } else {
    const createUser = await new User({
      name: email.split('@')[0],
      email,
      picture,
    }).save()
    res.json(createUser)
  }
}

export const getUserInfo = async (req, res) => {
  const { email } = req.user
  User.findOne({ email }).exec((error, user) => {
    if (user) return res.json(user)
    if (error) throw new Error(error)
  })
}

export const applyCoupon = async (req, res) => {
  const { coupon } = req.body

  const validCoupon = await Coupon.findOne({ name: coupon }).exec()

  if (!validCoupon) {
    return res.json({
      error: 'Invalid coupon, try again',
    })
  } else {
    res.json(validCoupon)
  }
}

export const createOrder = async (req, res) => {
  try {
    const { paymentIntent } = req.body.stripeResponse

    const { slug } = req.body

    console.log(slug)

    const user = await User.findOne({ email: req.user.email }).exec()
    const tour = await Tour.findOne({ slug }).exec()

    let newOrder = await new Order({
      tour,
      paymentIntent,
      orderedBy: user._id,
    }).save()

    res.json({ approved: true })
  } catch (error) {
    console.log(error)
  }
}

export const fetchOrders = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec()

  const orders = await Order.find({ orderedBy: user._id })
    .populate('tour')
    .populate('continent', '_id name')
    .populate('country', '_id name')
    .exec()

  res.json(orders)
}
