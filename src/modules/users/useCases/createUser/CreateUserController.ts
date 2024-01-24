import { type Request, type Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  /**
   *
   * @param request
   * @param response
   * @returns Controller da criação de usuário
   */
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUserUseCase = new CreateUserUseCase()

    try {
      const result = await createUserUseCase.execute({ name, email, password })
      return response.status(201).json(result)
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }
}
