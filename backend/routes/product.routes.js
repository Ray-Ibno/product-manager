import express from 'express'
import {
  getProduct,
  postProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/product.controller.js'

const router = express.Router()

router.get('/', getProduct)

router.post('/', postProduct)

router.delete('/:id', deleteProduct)

router.put('/:id', updateProduct)

export default router
