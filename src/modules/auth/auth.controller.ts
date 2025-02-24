import { Request, Response } from 'express'
import AuthService from './auth.service'
import tryCatchWrapper from '../../utils/tryCatchWrapper'

const authService = new AuthService()

export const registerUser = tryCatchWrapper(
  async (req: Request, res: Response) => {
    const response = await authService.registerUser(req.body)
    res.status(response.statusCode).json(response)
  }
)

export const resendOtp = tryCatchWrapper(
  async (req: Request, res: Response) => {
    const response = await authService.resendOtp(req.body)
    res.status(response.statusCode).json(response)
  }
)

export const verifyOtp = tryCatchWrapper(
  async (req: Request, res: Response) => {
    const response = await authService.verifyOtp(req.body)
    res.status(response.statusCode).json(response)
  }
)

export const loginUser = tryCatchWrapper(
  async (req: Request, res: Response) => {
    const response = await authService.verifyOtp(req.body)
    res.status(response.statusCode).json(response)
  }
)
