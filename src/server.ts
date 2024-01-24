import express from 'express'
import { routes } from './routes'
import cors from 'cors'

// VERIFICA FLAG DEV_MODE
const devMode = process.env.DEV_MODE

const app = express()

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
// const allowedOrigins = [
//   // 'https://dbia.gabrielfreitas.com',
// ]

const allowedOrigins = () => {
  if (devMode === 'true') {
    return ['http://localhost:5173']
  }
  return ['https://dbia.gabrielfreitas.com']
}

const options: cors.CorsOptions = {
  origin: allowedOrigins(),
}

// Then pass these options to cors:
app.use(cors(options))

app.use(express.json())

app.use(routes)

app.get('/', (request, response) => response.json({ message: 'Hello World' }))

app.listen(3333, () => {
  console.log('🚀 Server stated on port 3333!')
})
