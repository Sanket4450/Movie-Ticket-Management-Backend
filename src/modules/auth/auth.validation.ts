import { z } from 'zod'
import { str_required } from '../../utils/validation'
import { VALIDATION_TYPES } from '../../utils/constants'

export const registerValidation = {
  [VALIDATION_TYPES.BODY]: z.object({
    fullname: str_required,
    username: str_required,
    email: str_required.email(),
    password: str_required.min(1, 'Password is required'),
  }),
}

export const verifyOtpValidation = {
  [VALIDATION_TYPES.BODY]: z.object({
    otp: str_required,
    email: str_required.email(),
  }),
}
