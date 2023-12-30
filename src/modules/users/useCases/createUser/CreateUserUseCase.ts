// import { type User } from '@prisma/client'
import { MyPrismaClient } from '../../../../config/PrismaClientConfig'
import { type CreateUserDto } from '../../dtos/CreateUserDto'
import { hash } from 'bcryptjs'

interface UserCreated {
  id: string | null
  email: string | null
  name: string | null
  create_at: Date | null
  updated_at: Date | null
}

export class CreateUserUseCase {
  async execute({
    name,
    email,
    password,
  }: CreateUserDto): Promise<UserCreated> {
    // Verificar se o usuário já existe
    const userAlreadyExists = await MyPrismaClient.user.findUnique({
      where: {
        email, // Quando o nome é o mesmo pode-se colocar apenas 1x sem os dois pontos e repetir.
      },
    })

    if (userAlreadyExists) {
      throw new Error('Email already registered!')
    }

    // Criptografando a senha

    const hashedPassword = await hash(password, 8)

    // Se não existir => Criar o usuário
    const user = await MyPrismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    delete user.password

    return user
  }
}
