import 'express-async-errors'
import { NextFunction, Request, Response } from 'express'
import { validateDto } from '../middleware/validation.middleware'
import { CreateUserDto } from '../dtos/auth/create-user.dto'
import * as authService from '../services/auth/auth.service'
import { LoginUserDto } from '../dtos/auth/login-user.dto'
import { ChangePasswordDto } from '../dtos/auth/change-password.dto'
import { AuthError } from '../services/auth/exceptions/auth.exception'
import { isAuthenticated } from '../middleware/auth.middleware'

export const register = [
    validateDto(CreateUserDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const createUserDto: CreateUserDto = req.body as CreateUserDto
        try {
            const newUser = await authService.registerUser(createUserDto)
            res.status(201).json(newUser)
        } catch (error) {
            if (error instanceof AuthError) {
                res.status(400).json({ message: 'Registration failed: ' + error.message })
            } else {
                next(error)
            }
        }
    },
]

export const login = [
    validateDto(LoginUserDto),
    async (req: Request, res: Response) => {
        const { username, password } = req.body
        const user = await authService.loginUser(username, password)

        if (user) {
            req.session.userId = user.id
            res.json(user)
        } else {
            res.status(401).json({ message: 'Invalid email or password' })
        }
    },
]

export const logout = [
    isAuthenticated,
    async (req: Request, res: Response) => {
        req.session.destroy(error => {
            error
                ? res.status(500).json({ message: 'Logout failed' })
                : res.status(204).send()
        })
    },
]

export const changePassword = [
    isAuthenticated,
    validateDto(ChangePasswordDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const changePasswordDto = req.body
        try {
            await authService.changePassword(req.session.userId as number, changePasswordDto)

            res.status(200).send()
        } catch (e) {
            if (e instanceof AuthError) {
                res.status(400).json({ message: e.message })
            } else {
                next(e)
            }
        }
    },
]
