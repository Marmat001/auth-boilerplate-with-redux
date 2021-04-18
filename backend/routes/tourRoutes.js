import express from 'express'
const router = express.Router()

const {
  authenticationCheck,
  adminCheck,
} = require('../middlewares/authMiddleware')

const { add, getAllTours, remove, getTourInfo } = require('../controllers/tourControllers')

router.post('/tour', authenticationCheck, adminCheck, add)
router.get('/tours/:amount', getAllTours )
router.delete('/tour/:slug', authenticationCheck, adminCheck, remove )
router.get('/tour/:slug',  getTourInfo )

module.exports = router
