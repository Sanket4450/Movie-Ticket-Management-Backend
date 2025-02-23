import { SUCCESS_MSG } from './messages'
import { HttpStatus } from './status'

interface SendResponse {
  statusCode?: number
  message?: string
  result?: any
}

export default function buildResponse({
  statusCode = HttpStatus.SUCCESS,
  message = SUCCESS_MSG.OK,
  result = {},
}: SendResponse) {
  return {
    statusCode,
    message,
    result,
  }
}
