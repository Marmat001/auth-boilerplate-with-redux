import express from 'express'
const router = express.Router()

const {
  authenticationCheck,
  adminCheck,
} = require('../middlewares/authMiddleware')

const {
  add,
  getAllTours,
  remove,
  getTourInfo,
  update,
  show,
  allTours,
  showRelated
} = require('../controllers/tourControllers')

router.post('/tour', authenticationCheck, adminCheck, add)
router.get('/tours/count', allTours)
router.get('/tours/:amount', getAllTours)
router.delete('/tour/:slug', authenticationCheck, adminCheck, remove)
router.get('/tour/:slug', getTourInfo)
router.put('/tour/:slug', authenticationCheck, adminCheck, update)
router.post('/tours', show)
router.get("/tour/related/:tourId", showRelated)

module.exports = router
