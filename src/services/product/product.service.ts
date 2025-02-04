import { Product } from '../../models/product'
import productRepository from '../../repositories/product.repository'

export interface ProductServiceType {
    list(): Promise<Product[]>
}

class ProductService implements ProductServiceType {
    public async list(): Promise<Product[]> {
        return productRepository.getAll()
    }
}

export default new ProductService()