import { Request, Response, NextFunction } from 'express'
import { cacheService } from '../services/cache/cache.service'

export const cache = async (req: Request, res: Response, next: NextFunction) => {
    const key = req.originalUrl
    try {
        const cachedValue = await cacheService.get(key)
        if (cachedValue) {
            return res.type('json').send(cachedValue)
        } else {
            next()
        }
    } catch (e) {
        next(e)
    }
}
