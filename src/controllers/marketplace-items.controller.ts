import 'express-async-errors'
import { Request, Response } from 'express'
import { marketPlaceService } from '../services/items/marketplace-items.service'
import { isAuthenticated } from '../middleware/auth.middleware'

export const minPrices = [
    isAuthenticated,
    async (req: Request, res: Response) => {
        res.json(await marketPlaceService.fetchLowestPriceItems())
    },
]