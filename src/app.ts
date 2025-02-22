import express, { Request, Response } from 'express'
import { STATUS_CODES } from './utils/status'
import { connectDB } from './config/db'

connectDB()

const app = express()

app.get('/', (_req: Request, res: Response) => {
  res.sendStatus(STATUS_CODES.SUCCESS)
})

export default app
