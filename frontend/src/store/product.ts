import { create } from 'zustand'

type Product = {
  _id: string
  name: string
  price: string
  image: string
}

type FetchedProduct = {
  name: string
  price: string
  image: string
}

type Products = Product[]

type Store = {
  products: Products
  setProducts: (products: Products) => void
  createProduct: (newProduct: FetchedProduct) => Promise<{
    success: boolean
    message: string
  }>
  fetchProducts: () => void
  deleteProduct: (id: string) => Promise<{ success: boolean; message: string }>
  editProduct: (
    id: string,
    newProductData: {
      name: string
      price: number
      image: string
    },
  ) => Promise<{ success: boolean; message: string }>
}

export const useProductStore = create<Store>()((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: 'Please input all fields' }
    }

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })

    const data = await res.json()
    if (!data.success) return { success: false, message: data.message }
    set((state) => ({ products: [...state.products, data.data] }))

    return { success: true, message: data.message }
  },
  fetchProducts: async () => {
    const res = await fetch('/api/products')
    const data = await res.json()
    if (!data.success) return { success: false, message: data.message }
    set({ products: data.data })
  },
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })

    const data = await res.json()
    if (!data.success) return { success: false, message: data.message }
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }))
    return { success: true, message: data.message }
  },
  editProduct: async (id, newProductData) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProductData),
    })
    const data = await res.json()
    if (!data.success) return { success: false, message: data.message }
    set((state) => ({
      products: state.products.map((product) => (product._id === id ? data.data : product)),
    }))
    return { success: true, message: 'Product successfully edited' }
  },
}))
