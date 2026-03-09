import path from 'path'
import express from 'express'
import productRoutes from './routes/product.routes.js'
import { globalErrorHandler } from './middlewares/globalErrorHandler.middleware.js'

const __dirname = path.resolve()

const app = express()
app.use(express.json())

app.use('/api/products', productRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  app.get('/*path', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}

app.use(globalErrorHandler)

export default app
