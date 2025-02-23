import { VALIDATION_TYPES } from '../utils/constants'

export type ValidationType =
  (typeof VALIDATION_TYPES)[keyof typeof VALIDATION_TYPES]

export interface BuiltResponse {
  statusCode: number
  message: string
  result: object
}
