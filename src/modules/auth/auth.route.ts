import { Router } from 'express'
import validateReq from '../../middlewares/validateReq'
import * as authValidation from './auth.validation'
import * as authController from './auth.controller'

const router = Router()

router.post(
  '/register',
  validateReq(authValidation.registerValidation),
  authController.registerUser
)

router.post(
  '/verify-otp',
  validateReq(authValidation.verifyOtpValidation),
  authController.verifyOtp
)

export default router
