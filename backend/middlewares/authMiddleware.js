const admin = require('../firebase')
import User from '../models/userModel'

export const authenticationCheck = async (req, res, callback) => {
  try {
    const user = await admin.auth().verifyIdToken(req.headers.token)
    req.user = user
    callback()
  } catch (error) {
    res.status(401).json({
      error: 'Invalid or expired token',
    })
  }
}

export const adminCheck = async (req, res, callback) => {
  const { email } = req.user

  const user = await User.findOne({ email }).exec()

  if (user.role === 'admin') {
    callback()
  } else {
    res.status(403).json({
      error: 'Admin resource, access denied.',
    })
  }
}
