import { Request, Response } from 'express'

export const login = (req: Request, res: Response) => {
    res.json({ lol: 'hello' })
}

export const register = (req: Request, res: Response) => {}

export const changePassword = (req: Request, res: Response) => {}
