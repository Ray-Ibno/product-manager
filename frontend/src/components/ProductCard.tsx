import { Box, Heading, HStack, IconButton, Image, Text } from '@chakra-ui/react'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'
import { useColorModeValue } from './ui/color-mode'
import { useProductStore } from '@/store/product'
import toaster from '@/config/toaster'
import modal from './ui/modal'

type Product = {
  product: {
    _id: string
    name: string
    price: number
    image: string
  }
}

function ProductCard({ product }: Product) {
  const { deleteProduct } = useProductStore()

  const textColor = useColorModeValue('gray.600', 'gray.200')
  const bg = useColorModeValue('white', 'gray.800')

  const handleDeleteProduct = async (id: string) => {
    const { success, message } = await deleteProduct(id)
    toaster.create({
      title: message,
      type: success ? 'success' : 'error',
    })
  }

  const handleEditProduct = async (id: string) => {
    modal.open('form', {
      title: 'Edit Product',
      id: id,
      product: product,
    })
  }

  return (
    <>
      <Box
        shadow={'lg'}
        rounded={'lg'}
        overflow={'hidden'}
        transition={'all 0.3s'}
        _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
        bg={bg}
      >
        <Image
          src={product.image}
          alt={product.name}
          height={48}
          width={'full'}
          objectFit={'cover'}
        />
        <Box p={4}>
          <Heading as={'h3'} size={'md'} mb={2}>
            {product.name}
          </Heading>
          <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
            ${product.price}
          </Text>
          <HStack>
            <IconButton colorScheme={'blue'} onClick={() => handleEditProduct(product._id)}>
              <CiEdit />
            </IconButton>
            <IconButton colorScheme={'blue'} onClick={() => handleDeleteProduct(product._id)}>
              <MdDeleteOutline />
            </IconButton>
          </HStack>
        </Box>
      </Box>
      <modal.Viewport />
    </>
  )
}

export default ProductCard
