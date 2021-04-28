import express from 'express'

const router = express.Router()

const { authenticationCheck } = require('../middlewares/authMiddleware')

const {
  stripeSessionId,
  stripeSuccess,
} = require('../controllers/stripeControllers')

router.post('/stripe-session-id', authenticationCheck, stripeSessionId)
router.post('/stripe-success', authenticationCheck, stripeSuccess)

module.exports = router
