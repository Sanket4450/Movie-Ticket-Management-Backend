import { join } from 'path'
import EmailService from '../../services/email.service'
import { BuiltResponse } from '../../types/common'
import { SendEmail } from '../../types/email'
import AppError from '../../utils/appError'
import buildResponse from '../../utils/buidResponse'
import { generateOTP, readFileAsync } from '../../utils/fn'
import { EMAIL_SUB, ERROR_MSG, SUCCESS_MSG } from '../../utils/messages'
import { HttpStatus } from '../../utils/status'
import { RegisterUserDto, verifyOtpDto } from './auth.dto'
import { UserRepository } from './auth.repository'
import { CONSTANTS, TEMPLATE_FILE_NAMES } from '../../utils/constants'
import Handlebars from 'handlebars'
import RedisService from '../../services/redis.service'

const emailService = new EmailService()
const redisService = new RedisService()
const userRepository = new UserRepository()

export async function registerUser(
  body: RegisterUserDto
): Promise<BuiltResponse> {
  const user = await userRepository.getUser({
    OR: [{ username: body.username }, { email: body.email }],
  })

  if (user) {
    if (user.username.toLowerCase() === body.username.toLowerCase()) {
      throw new AppError(
        HttpStatus.FORBIDDEN,
        ERROR_MSG.USER_EXIST_WITH_USERNAME
      )
    }

    if (user.email === body.email) {
      throw new AppError(HttpStatus.FORBIDDEN, ERROR_MSG.USER_EXIST_WITH_EMAIL)
    }
  }

  body.authType = 'basic'

  await userRepository.createUser(body)

  const templatePath = join(
    process.cwd(),
    CONSTANTS.TEMPLATES_DIR_NAME,
    TEMPLATE_FILE_NAMES.VERIFY_USER
  )

  const verifyUserTemplate = await readFileAsync(templatePath, 'utf-8')

  const otp = generateOTP()

  await redisService.setWithExpiry(
    `${CONSTANTS.OTP}:${body.email}`,
    otp,
    CONSTANTS.VERIFICATION_OTP_EXPIRY * 60
  )

  const templatePayload = {
    projectName: CONSTANTS.PROJECT_NAME,
    otp,
    otpExpiry: CONSTANTS.VERIFICATION_OTP_EXPIRY,
  }

  const content = Handlebars.compile(verifyUserTemplate)(templatePayload)

  const emailData: SendEmail = {
    to: body.email,
    subject: EMAIL_SUB.VERIFY_ACCOUNT,
    content,
  }

  // Asynchronous verificatin email send
  emailService.sendEmail(emailData)

  return buildResponse({
    statusCode: HttpStatus.SUCCESS,
    message: SUCCESS_MSG.VERIFICATION_LINK_SENT,
  })
}

export async function verifyOtp(body: verifyOtpDto): Promise<BuiltResponse> {
  const user = await userRepository.getUser({
    email: body.email,
  })

  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, ERROR_MSG.USER_EXIST_WITH_EMAIL)
  }

  if (user.is_verified) {
    throw new AppError(HttpStatus.NOT_FOUND, ERROR_MSG.USER_ALREADY_VERIFIED)
  }

  const otp = await redisService.get(`${CONSTANTS.OTP}:${body.email}`)

  if (!otp) {
    throw new AppError(HttpStatus.NOT_FOUND, ERROR_MSG.OTP_EXPIRED)
  }

  if (body.otp !== otp) {
    throw new AppError(HttpStatus.NOT_FOUND, ERROR_MSG.INVALID_OTP)
  }

  await userRepository.updateUser({ email: body.email }, { is_verified: true })

  return buildResponse({
    statusCode: HttpStatus.SUCCESS,
    message: SUCCESS_MSG.ACCOUNT_VERIFIED,
  })
}
