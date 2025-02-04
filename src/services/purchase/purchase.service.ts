import userRepository from '../../repositories/user.repository'
import { PurchaseInfo } from '../../models/purchase'
import { PurchaseDto } from '../../dtos/product/purchase.dto'
import purchaseRepository from '../../repositories/purchase.repository'
import { PurchaseError } from './exceptions/purchase.exception'
import productRepository from '../../repositories/product.repository'

export interface PurchaseServiceType {
    list(userId: number): Promise<PurchaseInfo[]>

    purchase(userId: number, purchaseDto: PurchaseDto): Promise<number>
}

class PurchaseService implements PurchaseServiceType {
    public async list(userId: number): Promise<PurchaseInfo[]> {
        return purchaseRepository.getAllInfoByUser(userId)
    }

    public async purchase(userId: number, purchaseDto: PurchaseDto): Promise<number> {
        const user = await userRepository.findById(userId)
        if (!user) {
            throw new PurchaseError('User not found: ' + userId)
        }

        const product = await productRepository.findById(purchaseDto.productId)
        if (!product) {
            throw new PurchaseError('Product not found: ' + purchaseDto.productId)
        }

        const totalPrice = product.price * purchaseDto.quantity

        if (user.balance < totalPrice) {
            throw new PurchaseError('Not enough user balance: ' + user.balance)
        }

        return purchaseRepository.createPurchaseAndUpdateBalance(user, product, purchaseDto.quantity)
    }
}

export default new PurchaseService()
