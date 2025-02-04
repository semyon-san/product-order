import { isAuthenticated } from '../middleware/auth.middleware'
import { NextFunction, Request, Response } from 'express'
import purchaseService from '../services/purchase/purchase.service'
import { validateDto } from '../middleware/validation.middleware'
import { PurchaseDto } from '../dtos/product/purchase.dto'
import { PurchaseError } from '../services/purchase/exceptions/purchase.exception'

export const list = [
    isAuthenticated,
    async (req: Request, res: Response) => {
        res.json(await purchaseService.list(req.session.userId as number))
    },
]

export const purchase = [
    isAuthenticated,
    validateDto(PurchaseDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const purchaseDto: PurchaseDto = req.body as PurchaseDto
        try {
            const newUserBalance = await purchaseService.purchase(req.session.userId as number, purchaseDto)
            res.json({ userBalance: newUserBalance })
        } catch (err) {
            if (err instanceof PurchaseError) {
                res.status(400).json({ message: err.message })
            } else {
                next(err)
            }
        }
    },
]
