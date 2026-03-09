import Product from '../models/product.model.js'
import mongoose from 'mongoose'
import AppError from '../errors/AppError.js'

export const getProductService = async () => {
  try {
    const products = await Product.find({})
    return products
  } catch (error) {
    console.log('error in fetching products: ', error.message)
    throw error
  }
}

export const createProduct = async (req) => {
  const product = req.body

  if (!product.name || !product.price || !product.image) {
    throw new AppError('Please provide all fields', 400)
  }

  const newProduct = new Product(product)

  try {
    await newProduct.save()
    return newProduct
  } catch (error) {
    console.log('error in posting a product', error.message)
    throw error
  }
}

export const updateProductService = async (req) => {
  const newProductData = req.body
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid product id', 404)
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, newProductData, {
      new: true,
    })
    return updatedProduct
  } catch (error) {
    console.log('error in updating product', error.message)
    throw error
  }
}

export const deleteProductService = async (req) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid product id', 404)
  }

  try {
    await Product.findByIdAndDelete(id)
  } catch (error) {
    console.log('error in deleting a product', error.message)
    throw error
  }
}
