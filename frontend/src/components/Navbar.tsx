import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import { CiCloudMoon, CiSquarePlus, CiSun } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { useColorMode } from './ui/color-mode'

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container maxW={'1140px'} px={4}>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Text
          bgGradient="to-l"
          gradientFrom="#7928CA"
          gradientTo="#FF0080"
          textAlign="center"
          bgClip="text"
          fontSize={{ base: '22', sm: '28' }}
          fontWeight="bold"
        >
          <Link to={'/'}>PRODUCT MANAGER</Link>
        </Text>
        <HStack gap={2} alignItems={'center'}>
          <Link to={'/create'}>
            <Button>
              <CiSquarePlus fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <CiSun /> : <CiCloudMoon />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar
