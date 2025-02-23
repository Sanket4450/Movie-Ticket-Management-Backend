const MESSAGES = {
  ERROR_MSG: {
    // general
    ROUTE_NOT_FOUND: 'Route not Found!',
    INTERNAL_SERVER_ERROR: 'Internal Server Error!',

    // Auth
    USER_NOT_FOUND_WITH_USERNAME: 'User not found with the provided email!',
    INCORRECT_PASSWORD: 'Incorrect password!',
    USER_EXIST_WITH_EMAIL: 'User already exists with the provided email!',
    USER_EXIST_WITH_USERNAME: 'User already exists with the provided username!',
    USER_ALREADY_VERIFIED: 'User is already verified!',
    OTP_EXPIRED: 'OTP is expired! Please resend a new OTP',
    INVALID_OTP: 'Invalid OTP!',
  },

  SUCCESS_MSG: {
    // Auth
    OK: 'OK!',
    LOGIN_SUCCESS: 'User logged-in successfully.',
    LOGOUT_SUCCESS: 'Logout successfull.',
    VERIFICATION_LINK_SENT:
      'Account verification link has been sent to your email address.',
    ACCOUNT_VERIFIED:
      'Account verified successfully.',
  },

  EMAIL_SUB: {
    VERIFY_ACCOUNT: 'Verify Your Account',
  },
}

export const { ERROR_MSG, SUCCESS_MSG, EMAIL_SUB } = MESSAGES
