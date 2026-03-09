import { connectDB } from './config/db.js'
import app from './app.js'

import dotenv from 'dotenv'

const PORT = process.env.PORT || 4000

dotenv.config()

app.listen(PORT, () => {
  connectDB()
  console.log(`Listening to port ${PORT}`)
})
