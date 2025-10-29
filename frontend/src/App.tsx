import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Createpage from './pages/Createpage'
import Navbar from './components/Navbar'
import { useColorModeValue } from './components/ui/color-mode'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <Box minH={'100vh'} bg={useColorModeValue('gray.100', 'gray.900')}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<Createpage />} />
      </Routes>
      <Toaster />
    </Box>
  )
}

export default App
