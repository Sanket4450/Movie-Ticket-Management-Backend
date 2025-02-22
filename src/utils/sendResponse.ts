import { SUCCESS_MSG } from './constants'
import { STATUS_CODES } from './status'

interface SendResponse {
  statusCode?: number
  message?: string
  result?: any
}

export default function sendReponse({
  statusCode = STATUS_CODES.SUCCESS,
  message = SUCCESS_MSG.OK,
  result = {},
}: SendResponse) {
  return {
    statusCode,
    message,
    result,
  }
}
