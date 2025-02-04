import redisClient from '../config/redis'

export interface CacheServiceType {
    set(key: string, value: string, timeout: number): Promise<void>
    get(key: string): Promise<string | null>
    invalidate(key: string): Promise<void>
    exists(key: string): Promise<boolean>
}

class CacheService implements CacheServiceType {
    private redisClient

    constructor() {
        this.redisClient = redisClient
    }

    public async set(key: string, value: string, timeout: number): Promise<void> {
        await this.redisClient.setEx(key, timeout, value)
    }

    public async get(key: string): Promise<string | null> {
        return await this.redisClient.get(key)
    }

    public async exists(key: string): Promise<boolean> {
        return !!(await this.redisClient.exists(key))
    }

    public async invalidate(key: string): Promise<void> {
        await this.redisClient.del(key)
    }
}

export const cacheService = new CacheService()