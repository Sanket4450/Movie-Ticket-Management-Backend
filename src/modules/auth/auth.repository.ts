import { Prisma, User } from '@prisma/client'
import prisma from '../../config/prisma'

export class UserRepository {
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data })
  }

  async getUserById(userId: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { userId } })
  }

  async getUser(where: Prisma.UserWhereInput): Promise<User | null> {
    return prisma.user.findFirst({ where })
  }

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany({ where: {} })
  }

  async updateUserById(
    userId: string,
    data: Prisma.UserUpdateInput
  ): Promise<User | null> {
    return prisma.user.update({
      where: { userId },
      data,
    })
  }

  async updateUser(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput
  ): Promise<User | null> {
    return prisma.user.update({
      where,
      data,
    })
  }

  async deleteUser(userId: string): Promise<void> {
    await prisma.user.delete({ where: { userId } })
  }
}
