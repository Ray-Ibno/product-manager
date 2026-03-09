import asyncHandler from 'express-async-handler'
import * as productService from '../services/product.service.js'
import { responseHelper } from '../utils/responseHelper.js'

export const getProduct = asyncHandler(async (req, res) => {
  const products = await productService.getProductService()
  responseHelper(res, 200, products)
})

export const postProduct = asyncHandler(async (req, res) => {
  const newProduct = await productService.createProduct(req)
  responseHelper(res, 201, newProduct, 'Successfully created a product')
})

export const deleteProduct = asyncHandler(async (req, res) => {
  const deletedProduct = await productService.deleteProductService(req)
  responseHelper(res, 200, deleteProduct, 'Successfully deleted a product')
})

export const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await productService.updateProductService(req)
  responseHelper(res, 200, updatedProduct)
})
