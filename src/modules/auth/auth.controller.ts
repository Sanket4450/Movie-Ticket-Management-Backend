import { Request, Response } from 'express'
import * as authService from './auth.service'
import tryCatchWrapper from '../../utils/tryCatchWrapper'

export const registerUser = tryCatchWrapper(
  async (req: Request, res: Response) => {
    const response = await authService.registerUser(req.body)
    res.status(response.statusCode).json(response)
  }
)

export const verifyOtp = tryCatchWrapper(
  async (req: Request, res: Response) => {
    const response = await authService.verifyOtp(req.body)
    res.status(response.statusCode).json(response)
  }
)
