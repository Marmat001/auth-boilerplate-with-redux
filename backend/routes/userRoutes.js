import express from 'express'
const router = express.Router()

const { authenticationCheck } = require('../middlewares/authMiddleware')
const { createOrUpdate, getUserInfo } = require('../controllers/userControllers')

router.post('/user/create-update', authenticationCheck, createOrUpdate)
router.post('/user/get-info', authenticationCheck, getUserInfo)

module.exports = router
