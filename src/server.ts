import express from 'express'
import { routes } from './routes'
import cors from 'cors'

const app = express()

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = [
  // 'http://localhost:5173',
  'https://dbia.gabrielfreitas.com',
]

const options: cors.CorsOptions = {
  origin: allowedOrigins,
}

// Then pass these options to cors:
app.use(cors(options))

app.use(express.json())

app.use(routes)

app.get('/', (request, response) => response.json({ message: 'Hello World' }))

app.listen(3333, () => {
  console.log('🚀 Server stated on port 3333!')
})
