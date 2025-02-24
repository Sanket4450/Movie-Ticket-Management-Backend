import { Router } from 'express'
import validateReq from '../../middlewares/validateReq'
import * as authValidation from './user.validation'
import * as authController from './user.controller'

const router = Router()

router.patch(
  '/',
  validateReq(authValidation.updateUserValidation),
  authController.updateUser
)

export default router
