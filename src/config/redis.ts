import 'dotenv/config'
import { createClient } from 'redis'

const host = process.env.REDIS_HOST || 'localhost'
const port = process.env.REDIS_PORT || 6379

const redisClient = createClient({
    url: `redis://${host}:${port}`,
})

redisClient.on('error', (err) => console.error('Redis Client Error', err))

redisClient.connect().then(() => console.log('Redis server connected'))

export default redisClient