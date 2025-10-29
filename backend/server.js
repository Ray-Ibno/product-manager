import path from 'path'
import express from 'express'
import { connectDB } from './config/db.js'
import productRoutes from './routes/product.routes.js'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.resolve()

const PORT = process.env.PORT || 4000

const app = express()
app.use(express.json())

app.use('/api/products', productRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  app.get('/*path', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  connectDB()
  console.log(`Connected to DB and listening to port ${PORT}`)
})
