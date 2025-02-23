import { z } from 'zod'

export const str_required = z.string()
export const str = str_required.optional()

export const int_required = z.number().int()
export const int = int_required.optional()

export const boolean_required = z.boolean()
export const boolean = boolean_required.optional()
