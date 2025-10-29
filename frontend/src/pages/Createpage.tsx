import { useColorModeValue } from '@/components/ui/color-mode'
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react'
import { toaster } from '@/components/ui/toaster'
import { useState } from 'react'
import { useProductStore } from '../store/product'

type Product = {
  name: string
  price: string
  image: string
}

function Createpage() {
  const { createProduct } = useProductStore()

  const [newProduct, setNewProduct] = useState<Product>({
    name: '',
    price: '',
    image: '',
  })

  const handleSubmitProduct = async () => {
    const { success, message } = await createProduct(newProduct)
    toaster.create({
      title: message,
      type: success ? 'success' : 'error',
    })
    if (success) {
      setNewProduct({
        name: '',
        price: '',
        image: '',
      })
    }
  }

  return (
    <Container maxW={'sm'}>
      <VStack gap={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          p={6}
          rounded={'lg'}
          shadow={'md'}
        >
          <VStack gap={4}>
            <Input
              placeholder="product name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="product price"
              name="price"
              value={newProduct.price}
              type="number"
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="product image"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button
              colorScheme={'blue'}
              onClick={handleSubmitProduct}
              w={'full'}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Createpage
