import { Request, Response, NextFunction } from 'express'
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'

export const validateDto = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoInstance = plainToInstance(dtoClass, req.body)
        const errors = await validate(dtoInstance)

        if (errors.length > 0) {
            const validationErrors = errors.map((error: ValidationError) => {
                return Object.values(error.constraints || {}).join(', ')
            })
            res.status(400).json({ message: 'Validation failed', errors: validationErrors })
        } else {
            req.body = dtoInstance
            next()
        }
    }
}