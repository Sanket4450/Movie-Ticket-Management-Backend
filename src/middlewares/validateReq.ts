import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'
import AppError from '../utils/appError'
import { HttpStatus } from '../utils/status'

export default function validateReq(
  validationSchema: Record<string, ZodSchema>
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    for (const [key, schema] of Object.entries(validationSchema)) {
      const result = schema.safeParse(req[key as keyof Request])

      if (result.error) {
        next(
          new AppError(HttpStatus.BAD_REQUEST, result.error.errors[0].message)
        )
      }
    }

    next()
  }
}
