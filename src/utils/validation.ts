import { z } from 'zod'

export const str_required = z.string()
export const str = str_required.optional()

export const email_required = str_required
  .email('Enter a valid email')
  .min(1, 'Email is required')
export const email = str_required.email('Enter a valid email').optional()

export const password = str_required.min(1, 'Password is required')

export const int_required = z.number().int()
export const int = int_required.optional()

export const boolean_required = z.boolean()
export const boolean = boolean_required.optional()

export const date_required = z.date()
export const date = date_required.optional()
