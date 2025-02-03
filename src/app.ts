import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import userRoutes from './routes/authRoutes'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api', userRoutes)

export default app
