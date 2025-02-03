import express from 'express'
import * as authController from '../controllers/authController'

const router = express.Router()

router.post('/auth/login', authController.login)
router.post('/auth/register', authController.register)
router.post('/auth/change-password', authController.changePassword)

export default router
