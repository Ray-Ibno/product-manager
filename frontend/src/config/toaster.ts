import { createToaster } from '@chakra-ui/react'

const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
})

export default toaster
