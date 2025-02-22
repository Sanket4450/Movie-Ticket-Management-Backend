import express, { Request, Response } from 'express'
import cors from 'cors'
import { STATUS_CODES } from './utils/status'
import config from './config'
import { ERROR_MSG } from './utils/constants'
import appRouter from './modules'
import AppError from './utils/appError'
import errorHandler from './middlewares/errorHandler'

config()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req: Request, res: Response) => {
  res.sendStatus(STATUS_CODES.SUCCESS)
})

app.use('/api', appRouter)

app.use(() => {
  throw new AppError(STATUS_CODES.NOT_FOUND, ERROR_MSG.ROUTE_NOT_FOUND)
})

app.use(errorHandler)

export default app
