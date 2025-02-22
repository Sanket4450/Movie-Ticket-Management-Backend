import { NextFunction, Request, Response } from 'express'
import { STATUS_CODES } from '../utils/status'
import { ERROR_MSG } from '../utils/constants'

export default function errorHandler(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR
  const message = error.message || ERROR_MSG.INTERNAL_SERVER_ERROR

  res.status(statusCode).json({ statusCode, message })
}
