import sql from '../config/database'
import { Product } from '../models/product'

class ProductRepository {
    public async getAll(): Promise<Product[]> {
        return sql<Product[]>`SELECT id, name, serial, price
                              FROM products`
    }

    public async findById(id: number): Promise<Product | null> {
        const [product] = await sql<Product[]>`SELECT *
                                               FROM products
                                               WHERE id = ${id}`
        return product || null
    }
}

export default new ProductRepository()