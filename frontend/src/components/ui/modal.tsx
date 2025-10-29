import { useProductStore } from '@/store/product'
import { toaster } from '@/components/ui/toaster'
import {
  createOverlay,
  Dialog,
  Portal,
  Stack,
  Button,
  Input,
} from '@chakra-ui/react'
import { useState } from 'react'

interface ContactFormProps {
  title?: string
  id: string
  product: {
    name: string
    price: string
    image: string
  }
}

const modal = createOverlay<ContactFormProps>((props) => {
  const { title, ...rest } = props
  const [name, setName] = useState(props.product.name)
  const [price, setPrice] = useState(props.product.price)
  const [image, setImage] = useState(props.product.image)

  const { editProduct } = useProductStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { success, message } = await editProduct(props.id, {
      name,
      price,
      image,
    })

    toaster.create({
      title: message,
      type: success ? 'success' : 'error',
    })

    // Close dialog using injected `onOpenChange` prop
    props.onOpenChange?.({ open: false })
  }

  return (
    <Dialog.Root {...rest}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {title && (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body>
              <form onSubmit={handleSubmit}>
                <Stack gap="4">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                  <Input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter your name"
                  />
                  <Input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Enter your name"
                  />
                  <Button type="submit">Update</Button>
                </Stack>
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
})

export default modal
