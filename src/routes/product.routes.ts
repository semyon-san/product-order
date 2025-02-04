import express from 'express'
import * as productController from '../controllers/products.controller'

const router = express.Router()

router.get('/products', productController.list)

export default router
