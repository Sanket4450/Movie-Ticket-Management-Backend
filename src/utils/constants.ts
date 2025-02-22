const MESSAGES = {
  ERROR_MSG: {
    // general
    ROUTE_NOT_FOUND: 'Route not Found!',
    INTERNAL_SERVER_ERROR: 'Internal Server Error!',

    // user
    USER_NOT_FOUND_WITH_USERNAME: 'User not found with the provided email!',
    INCORRECT_PASSWORD: 'Incorrect password!',
  },

  SUCCESS_MSG: {
    OK: 'OK!',
    LOGIN_SUCCESS: 'User logged-in successfully.',
    LOGOUT_SUCCESS: 'Logout successfull.',
  },
}

export const { ERROR_MSG, SUCCESS_MSG } = MESSAGES

export const APP_ENV = {
  DEV: 'dev',
  STAGING: 'staging',
  PROD: 'prod',
}
