import { readFile, writeFile } from 'fs'
import { promisify } from 'util'

export const readFileAsync = promisify(readFile)
export const writeFileAsync = promisify(writeFile)

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
