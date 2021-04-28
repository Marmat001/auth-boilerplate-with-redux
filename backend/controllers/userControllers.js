import User from '../models/userModel'
import Coupon from '../models/couponModel'

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
