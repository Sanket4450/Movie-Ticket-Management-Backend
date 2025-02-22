import { connectDB } from './prisma'

export default function config() {
  connectDB()
}
