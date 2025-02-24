import { BuiltResponse } from '../../types/common'
import buildResponse from '../../utils/buidResponse'
import { ERROR_MSG, SUCCESS_MSG } from '../../utils/messages'
import { HttpStatus } from '../../utils/status'
import { UserRepository } from './user.repository'
import CryptoService from '../../services/crypto.service'
import { UpdateUserDto } from './user.dto'

export default class AuthService {
  private static instance: AuthService
  private cryptoService: CryptoService
  private userRepository: UserRepository

  constructor() {
    this.cryptoService = CryptoService.getInstance()
    this.userRepository = UserRepository.getInstance()
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async updateUser(body: UpdateUserDto): Promise<BuiltResponse> {
    return buildResponse({
      statusCode: HttpStatus.SUCCESS,
      message: SUCCESS_MSG.PROFILE_UPDATED,
    })
  }
}
