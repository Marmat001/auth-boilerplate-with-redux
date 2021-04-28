import Coupon from '../models/couponModel'

export const add = async (req, res) => {
  const { name, expiry, discount } = req.body.coupon

  try {
    res.json(await new Coupon({ name, expiry, discount }).save())
  } catch (error) {
    res.status(400).send('Coupon creation unsuccessful')
  }
}

export const remove = async (req, res) => {
  try {
    res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec())
  } catch (error) {
    console.log(error)
  }
}

export const show = async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec())
  } catch (error) {
    console.log(error)
  }
}
