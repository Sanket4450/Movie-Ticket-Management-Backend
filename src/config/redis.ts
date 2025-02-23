import Redis from 'ioredis'

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
})

redis.on('connect', () => {
  console.log('Redis connected successfully')
})

redis.on('error', (err) => {
  console.log(`Error connecting with Redis: ${err}`)
})

process.on('SIGINT', async () => {
  await redis.quit()
  console.log('Redis connection closed.')
})

export default redis
