import { hash, compare } from 'bcryptjs'
export default class CryptoService {
  private static instance: CryptoService

  constructor() {}

  static getInstance(): CryptoService {
    if (!CryptoService.instance) {
      CryptoService.instance = new CryptoService()
    }
    return CryptoService.instance
  }

  encryptPassword(password: string): Promise<string> {
    return hash(password, 10)
  }

  isPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword)
  }
}
