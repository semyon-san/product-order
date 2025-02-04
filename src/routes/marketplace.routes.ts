import express from 'express'
import * as marketplaceController from '../controllers/marketplace-items.controller'

const router = express.Router()

router.get('/marketplace/min-prices', marketplaceController.minPrices)

export default router