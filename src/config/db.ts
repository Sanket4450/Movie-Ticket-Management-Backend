import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const connectDB = async () => {
  try {
    await prisma.$connect()
    console.log('Databse connected successfully')
  } catch (error) {
    console.log(`Error connecting with the Database: ${error}`)
    process.exit(1)
  }
}

export default prisma
