export const CONSTANTS = {
  PROJECT_NAME: 'Movie Ticket Management',
  TEMPLATES_DIR_NAME: 'templates',

  OTP: 'otp',

  VERIFICATION_OTP_EXPIRY: 20,
}

export const APP_ENV = {
  DEV: 'dev',
  STAGING: 'staging',
  PROD: 'prod',
}

export const VALIDATION_TYPES = {
  PARAMS: 'params',
  QUERY: 'query',
  BODY: 'body',
} as const

export const TEMPLATE_FILE_NAMES = {
  VERIFY_USER: 'verifyUser.hbs',
}
