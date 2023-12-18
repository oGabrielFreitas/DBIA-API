import { User } from '@prisma/client'

export interface AuthResponseDTO {
  token: string
  user: {
    name: User['name']
    email: User['email']
  }
}
