import { z } from 'zod'
import { date, email, str } from '../../utils/validation'
import { VALIDATION_TYPES } from '../../utils/constants'

export const updateUserValidation = {
  [VALIDATION_TYPES.BODY]: z.object({
    fullname: str,
    username: str,
    email,
    dob: date,
    mobile: str,
  }),
}
