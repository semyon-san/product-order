import 'express-async-errors'
import { Request, Response } from 'express'
import { isAuthenticated } from '../middleware/auth.middleware'
import productService from '../services/product/product.service'

export const list = [
    isAuthenticated,
    async (req: Request, res: Response) => {
        res.json(await productService.list())
    },
]