import { join } from 'path'
import EmailService from '../../services/email.service'
import { BuiltResponse } from '../../types/common'
import { SendEmail } from '../../types/email'
import AppError from '../../utils/appError'
import buildResponse from '../../utils/buidResponse'
import { generateOTP, readFileAsync } from '../../utils/fn'
import { EMAIL_SUB, ERROR_MSG, SUCCESS_MSG } from '../../utils/messages'
import { HttpStatus } from '../../utils/status'
import {
  LoginUserDto,
  RegisterUserDto,
  ResendOtpDto,
  VerifyOtpDto,
} from './auth.dto'
import { UserRepository } from '../user/user.repository'
import { CONSTANTS, TEMPLATE_FILE_NAMES } from '../../utils/constants'
import Handlebars from 'handlebars'
import RedisService from '../../services/redis.service'
import CryptoService from '../../services/crypto.service'

export default class AuthService {
  private static instance: AuthService
  private emailService: EmailService
  private redisService: RedisService
  private cryptoService: CryptoService
  private userRepository: UserRepository

  constructor() {
    this.emailService = EmailService.getInstance()
    this.redisService = RedisService.getInstance()
    this.cryptoService = CryptoService.getInstance()
    this.userRepository = UserRepository.getInstance()
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async registerUser(body: RegisterUserDto): Promise<BuiltResponse> {
    const user = await this.userRepository.getUser({
      where: { OR: [{ username: body.username }, { email: body.email }] },
    })

    if (user) {
      if (user.username.toLowerCase() === body.username.toLowerCase()) {
        throw new AppError(
          HttpStatus.FORBIDDEN,
          ERROR_MSG.USER_EXIST_WITH_USERNAME
        )
      }

      if (user.email === body.email) {
        throw new AppError(
          HttpStatus.FORBIDDEN,
          ERROR_MSG.USER_EXIST_WITH_EMAIL
        )
      }
    }

    body.authType = 'basic'

    const password = await this.cryptoService.encryptPassword(body.password)

    await this.userRepository.createUser({
      ...body,
      password,
    })

    await this.handleVerificationOtpGeneration(body.email)

    return buildResponse({
      statusCode: HttpStatus.SUCCESS,
      message: SUCCESS_MSG.VERIFICATION_LINK_SENT,
    })
  }

  async resendOtp(body: ResendOtpDto): Promise<BuiltResponse> {
    const user = await this.userRepository.getUser({
      where: { email: body.email },
    })

    if (!user) {
      throw new AppError(HttpStatus.NOT_FOUND, ERROR_MSG.USER_EXIST_WITH_EMAIL)
    }

    if (user.is_verified) {
      throw new AppError(HttpStatus.NOT_FOUND, ERROR_MSG.USER_ALREADY_VERIFIED)
    }

    await this.handleVerificationOtpGeneration(body.email)

    return buildResponse({
      statusCode: HttpStatus.SUCCESS,
      message: SUCCESS_MSG.VERIFICATION_LINK_SENT,
    })
  }

  async handleVerificationOtpGeneration(email: string): Promise<void> {
    const templatePath = join(
      process.cwd(),
      CONSTANTS.TEMPLATES_DIR_NAME,
      TEMPLATE_FILE_NAMES.VERIFY_USER
    )

    const verifyUserTemplate = await readFileAsync(templatePath, 'utf-8')

    const otp = generateOTP()

    await this.redisService.setWithExpiry(
      `${CONSTANTS.OTP}:${email}`,
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
      to: email,
      subject: EMAIL_SUB.VERIFY_ACCOUNT,
      content,
    }

    // Asynchronous verificatin email send
    this.emailService.sendEmail(emailData)
  }

  async verifyOtp(body: VerifyOtpDto): Promise<BuiltResponse> {
    const user = await this.userRepository.getUser({
      where: { email: body.email },
    })

    if (!user) {
      throw new AppError(HttpStatus.NOT_FOUND, ERROR_MSG.USER_EXIST_WITH_EMAIL)
    }

    if (user.is_verified) {
      throw new AppError(HttpStatus.NOT_FOUND, ERROR_MSG.USER_ALREADY_VERIFIED)
    }

    const otp = await this.redisService.get(`${CONSTANTS.OTP}:${body.email}`)

    if (!otp) {
      throw new AppError(HttpStatus.NOT_FOUND, ERROR_MSG.OTP_EXPIRED)
    }

    if (body.otp !== otp) {
      throw new AppError(HttpStatus.NOT_FOUND, ERROR_MSG.INVALID_OTP)
    }

    await this.userRepository.updateUser(
      { email: body.email },
      { is_verified: true }
    )

    return buildResponse({
      statusCode: HttpStatus.SUCCESS,
      message: SUCCESS_MSG.ACCOUNT_VERIFIED,
    })
  }

  async loginUser(body: LoginUserDto): Promise<BuiltResponse> {
    const user = await this.userRepository.getUser({
      where: { email: body.email, password: { not: null } },
      select: { userId: true, password: true },
    })

    if (!user) {
      throw new AppError(HttpStatus.NOT_FOUND, ERROR_MSG.USER_EXIST_WITH_EMAIL)
    }

    if (!user.is_verified) {
      throw new AppError(HttpStatus.NOT_FOUND, ERROR_MSG.USER_NOT_VERIFIED)
    }

    if (
      !(await this.cryptoService.isPasswordMatch(
        body.password,
        user.password as string
      ))
    ) {
      throw new AppError(HttpStatus.NOT_FOUND, ERROR_MSG.INVALID_PASSWORD)
    }

    return buildResponse({
      statusCode: HttpStatus.SUCCESS,
      message: SUCCESS_MSG.LOGIN_SUCCESS,
    })
  }
}
