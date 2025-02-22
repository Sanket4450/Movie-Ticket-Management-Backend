import { Prisma, User } from '@prisma/client'
import prisma from '../../config/prisma'

export class UserRepository {
  async createUser(data: User): Promise<User> {
    return prisma.user.create({ data })
  }

  async getUserById(userId: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { userId } })
  }

  async getUser(cond: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return prisma.user.findUnique({ where: cond })
  }

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany({ where: {} })
  }

  async updateUser(userId: string, data: Partial<User>): Promise<User | null> {
    return prisma.user.update({
      where: { userId },
      data,
    })
  }

  async deleteUser(userId: string): Promise<void> {
    await prisma.user.delete({ where: { userId } })
  }
}
