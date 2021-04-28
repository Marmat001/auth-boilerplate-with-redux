const express = require('express')
const router = express.Router()

const {
  authenticationCheck,
  adminCheck,
} = require('../middlewares/authMiddleware')

const { add, show, remove } = require('../controllers/couponControllers')

// routes
router.post('/coupon', authenticationCheck, adminCheck, add)
router.get('/coupons', show)
router.delete('/coupon/:couponId', authenticationCheck, adminCheck, remove)

module.exports = router
