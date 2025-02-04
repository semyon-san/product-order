export interface Purchase {
    id: number
    userId: number
    productId: number
    quantity: number
    totalPrice: number
    dateCreated: Date
}

export interface PurchaseInfo {
    id: number
    user: {
        id: number
        name: string
    }
    product: {
        id: number
        name: string
        serial: string
        currentPrice: number
    }
    quantity: number
    totalPrice: number
    datePurchased: Date
}