import { hash, compare } from 'bcryptjs'

class CryptoService {
  constructor() {}

  async encryptPassword(password: string): Promise<string> {
    return hash(password, 10)
  }

  async isPasswordMatch(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return compare(password, hashedPassword)
  }
}

export default CryptoService
