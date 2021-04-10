const admin = require('../firebase')

export const authenticationCheck = async (req, res, callback) => {
  try {
    const user = await admin.auth().verifyIdToken(req.headers.token)
    console.log('firebase user', user)
    req.user = user
    callback()
  } catch (error) {
    res.status(401).json({
      error: 'Invalid or expired token',
    })
  }
}
