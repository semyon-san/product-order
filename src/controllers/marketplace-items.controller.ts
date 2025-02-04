import 'express-async-errors'
import { Request, Response } from 'express'
import { marketPlaceService } from '../services/items/marketplace-items.service'
import { isAuthenticated } from '../middleware/auth.middleware'
import { cache } from '../middleware/cache.middleware'
import { cacheService } from '../services/cache/cache.service'

export const minPrices = [
    isAuthenticated,
    cache,
    async (req: Request, res: Response) => {
        const result = await marketPlaceService.fetchLowestPriceItems()

        await cacheService.set(req.originalUrl, JSON.stringify(result), marketPlaceService.getCacheTimeout())

        res.json(result)
    },
]