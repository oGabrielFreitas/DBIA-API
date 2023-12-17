import { type User } from '@prisma/client'
import { MyPrismaClient } from '../../../../config/PrismaClientConfig'
import { type CreateUserDto } from '../../dtos/CreateUserDto'
import { hash } from 'bcryptjs'

export class CreateUserUseCase {
  async execute({ name, email, password }: CreateUserDto): Promise<User> {
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

    return user
  }
}
