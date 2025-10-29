import Product from '../models/product.model.js'
import mongoose from 'mongoose'

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    console.log('error in fetching products: ', error.message)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}

export const postProduct = async (req, res) => {
  const product = req.body

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: 'Pleave provide all fields!!' })
  }

  const newProduct = new Product(product)

  try {
    await newProduct.save()
    res
      .status(201)
      .json({
        success: true,
        data: newProduct,
        message: 'Successfully created a product',
      })
  } catch (error) {
    console.log('error in posting a product', error.message)
    res.status(500).json({ success: false, message: 'Server Error!!' })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    await Product.findByIdAndDelete(id)
    res
      .status(200)
      .json({ success: true, message: 'successfully deleted a product' })
  } catch (error) {
    console.log('error in deleting a product', error.message)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params
  const newProductData = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'invalid product id' })
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, newProductData, {
      new: true,
    })
    res.status(200).json({ success: true, data: updatedProduct })
  } catch (error) {
    console.log('error in updating product', error.message)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}
