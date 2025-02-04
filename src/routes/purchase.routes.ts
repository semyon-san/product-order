import express from 'express'
import * as purchaseController from '../controllers/purchases.controller'

const router = express.Router()

router.get('/purchases', purchaseController.list)
router.post('/purchases', purchaseController.purchase)

export default router
