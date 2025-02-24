import { Request, Response } from 'express'
import AuthService from './user.service'
import tryCatchWrapper from '../../utils/tryCatchWrapper'

const authService = new AuthService()

export const updateUser = tryCatchWrapper(
  async (req: Request, res: Response) => {
    const response = await authService.updateUser(req.body)
    res.status(response.statusCode).json(response)
  }
)
