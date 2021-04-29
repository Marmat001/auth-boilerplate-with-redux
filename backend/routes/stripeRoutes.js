import express from 'express'

const router = express.Router()

const { authenticationCheck } = require('../middlewares/authMiddleware')

const {
  finalizeStripePayment
} = require('../controllers/stripeControllers')

router.post("/finalize-stripe-payment", authenticationCheck, finalizeStripePayment);


module.exports = router



