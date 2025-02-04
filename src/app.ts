import 'dotenv/config'
import express from 'express'
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
    })
)

app.use('/api', authRoutes)

export default app
