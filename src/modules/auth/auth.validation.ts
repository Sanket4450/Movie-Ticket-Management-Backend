import { z } from 'zod'
import { email_required, password, str_required } from '../../utils/validation'
import { VALIDATION_TYPES } from '../../utils/constants'

export const registerValidation = {
  [VALIDATION_TYPES.BODY]: z.object({
    fullname: str_required,
    username: str_required,
    email: email_required,
    password: str_required.min(1, 'Password is required'),
  }),
}

export const resendOtpValidation = {
  [VALIDATION_TYPES.BODY]: z.object({
    email: email_required,
  }),
}

export const verifyOtpValidation = {
  [VALIDATION_TYPES.BODY]: z.object({
    otp: str_required,
    email: email_required,
  }),
}

export const loginUserValidation = {
  [VALIDATION_TYPES.BODY]: z.object({
    email: email_required,
    password,
  }),
}
