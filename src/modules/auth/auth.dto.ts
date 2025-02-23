import { AuthType } from '@prisma/client'

export interface RegisterUserDto {
  fullname: string
  username: string
  email: string
  password: string
  authType: AuthType
}

export interface verifyOtpDto {
  otp: string
  email: string
}
