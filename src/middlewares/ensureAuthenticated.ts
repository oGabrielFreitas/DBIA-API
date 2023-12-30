import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import AuthConfig from '../config/AuthConfig'

// Usada para desestruturar o decoded token
interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação do Token JWT

  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error('JWT token is missing.')
  }

  // Dividindo a palavra 'Bearer' do resto do token, através da desestruturação
  const [, token] = authHeader.split(' ') // Posso tirar o 'type', já que não usarei, ficando apenas [,token]

  // Fazendo a verificação
  try {
    const decoded = verify(token, AuthConfig.jwt.secret) // Necessário criar o arquivo authConfig

    const { sub } = decoded as TokenPayload

    // Necessária a criação do tipo dentro de @types, no Request do Express
    request.user = {
      id: sub,
    }

    return next() // É esta declaração que "libera" o middleware
  } catch (err) {
    throw new Error('Invalid JWT token')
  }
}
