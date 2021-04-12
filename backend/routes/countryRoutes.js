import express from 'express'
const router = express.Router()

const {
  authenticationCheck,
  adminCheck,
} = require('../middlewares/authMiddleware')
const {
  showAll,
  add,
  show,
  remove,
  update,
} = require('../controllers/countryControllers')

router.post('/country', authenticationCheck, adminCheck, add)
router.get('/countries', showAll)
router.get('/country/:slug', show)
router.put('/country/:slug', authenticationCheck, adminCheck, update)
router.delete('/country/:slug', authenticationCheck, adminCheck, remove)

module.exports = router
