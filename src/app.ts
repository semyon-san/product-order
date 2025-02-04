import 'dotenv/config'
import express, { NextFunction, Response, Request } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'
import authRoutes from './routes/authRoutes'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'session-secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: !!process.env.IS_HTTPS },
    }),
)

app.use('/api', authRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    res.status(500).json({ message: 'Server side error: notify site admin' })
})

export default app
