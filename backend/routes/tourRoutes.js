import express from 'express'
const router = express.Router()

const {
  authenticationCheck,
  adminCheck,
} = require('../middlewares/authMiddleware')

const { add, getAllTours } = require('../controllers/tourControllers')

router.post('/tour', authenticationCheck, adminCheck, add)
router.get('/tours', getAllTours )

module.exports = router
