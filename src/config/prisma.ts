import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function connectDB() {
  try {
    await prisma.$connect()
    console.log('Databse connected successfully.')
  } catch (error) {
    console.log(`Error connecting with the Database: ${error}`)
    process.exit(1)
  }
}

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  console.log('Database connection closed.')
})

export default prisma
