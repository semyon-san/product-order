import { IsNumber, Min } from 'class-validator'

export class PurchaseDto {
    @IsNumber()
    productId: number

    @IsNumber()
    @Min(1)
    quantity: number
}