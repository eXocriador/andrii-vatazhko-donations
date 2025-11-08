import express from 'express'
import type { Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' })
})

const PORT = Number(process.env.PORT ?? 5000)
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/donations'

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI)
    app.listen(PORT, () => {
      console.log(`API ready on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server', error)
    process.exit(1)
  }
}

startServer()
