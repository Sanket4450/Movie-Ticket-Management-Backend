import redis from '../config/redis'

export default class RedisService {
  private static instance: RedisService
  constructor() {}

  static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService()
    }
    return RedisService.instance
  }

  async set(key: string, value: string) {
    await redis.set(key, value)
  }

  async setWithExpiry(key: string, value: string, seconds: number) {
    await redis.set(key, value, 'EX', seconds)
  }

  async get(key: string) {
    return redis.get(key)
  }

  async delete(key: string) {
    await redis.del(key)
  }
}
