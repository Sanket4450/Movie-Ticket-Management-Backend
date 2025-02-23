import { connectDB } from './prisma'
import './redis'

export default function config() {
  connectDB()
}
