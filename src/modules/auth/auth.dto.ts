import { AuthType } from '@prisma/client'

export interface RegisterUserDto {
  fullname: string
  username: string
  email: string
  password: string
  authType: AuthType
}

export interface ResendOtpDto {
  email: string
}

export interface VerifyOtpDto {
  otp: string
  email: string
}

export interface LoginUserDto {
  email: string
  password: string
}
