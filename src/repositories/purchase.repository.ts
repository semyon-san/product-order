import sql from '../config/database'
import { User } from '../models/user'
import { Purchase, PurchaseInfo } from '../models/purchase'
import { Product } from '../models/product'

interface PurchaseInfoFlat {
    purchaseId: number
    userId: number
    userName: string
    productId: number
    productName: string
    productSerial: string
    productPrice: number
    purchaseQuantity: number
    totalPrice: number
    datePurchased: Date
}

class PurchaseRepository {
    public async getAllInfoByUser(userId: number): Promise<PurchaseInfo[]> {
        const results = await sql<PurchaseInfoFlat[]>`SELECT purchases.id           as purchase_id,
                                                             users.id               as user_id,
                                                             users.username         as user_name,
                                                             products.id            as product_id,
                                                             products.name          as product_name,
                                                             products.serial        as product_serial,
                                                             products.price         as product_price,
                                                             purchases.quantity     as purchase_quantity,
                                                             purchases.total_price  as total_price,
                                                             purchases.date_created as date_purchased
                                                      FROM purchases
                                                               INNER JOIN products ON purchases.product_id = products.id
                                                               INNER JOIN users ON purchases.user_id = users.id
                                                      WHERE purchases.user_id = ${userId}`

        return results.map(row => ({
            id: row.purchaseId,
            user: {
                id: row.userId,
                name: row.userName,
            },
            product: {
                id: row.productId,
                name: row.productName,
                serial: row.productSerial,
                currentPrice: row.productPrice,
            },
            quantity: row.purchaseQuantity,
            totalPrice: row.totalPrice,
            datePurchased: row.datePurchased,

        }))
    }

    public async findById(id: number): Promise<Purchase | null> {
        const [purchase] = await sql<Purchase[]>`SELECT *
                                                 FROM purchases
                                                 WHERE id = ${id}`
        return purchase || null
    }

    public async createPurchaseAndUpdateBalance(user: User, product: Product, quantity: number): Promise<number> {
        return await sql.begin(async sql => {
            const totalPrice = product.price * quantity
            const newUserBalance = user.balance - totalPrice

            await Promise.all([
                sql`INSERT INTO purchases (user_id, product_id, quantity, total_price)
                    VALUES (${user.id}, ${product.id}, ${quantity}, ${totalPrice})`,

                sql`UPDATE users
                    SET balance = ${newUserBalance}
                    WHERE id = ${user.id}`,
            ])

            return newUserBalance
        })
    }
}

export default new PurchaseRepository()
