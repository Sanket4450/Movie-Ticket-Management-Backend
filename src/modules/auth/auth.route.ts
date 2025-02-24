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
  '/resend-otp',
  validateReq(authValidation.resendOtpValidation),
  authController.verifyOtp
)

router.post(
  '/verify-otp',
  validateReq(authValidation.verifyOtpValidation),
  authController.verifyOtp
)

router.post(
  '/login',
  validateReq(authValidation.loginUserValidation),
  authController.loginUser
)

export default router
