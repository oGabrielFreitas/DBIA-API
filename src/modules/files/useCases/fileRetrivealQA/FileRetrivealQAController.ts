import { type Request, type Response } from 'express'
import { FileRetrivealQAUseCase } from './FileRetrivealQAUseCase'

class FileRetrivealQAController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { query } = request.body
    const userId = request.user.id

    const fileRetrivealQA = new FileRetrivealQAUseCase()

    try {
      const answer = await fileRetrivealQA.execute({ query, userId })

      return response.status(200).json(answer)
    } catch (err) {
      return response.status(400).json({ message: err.message })
    }
  }
}

export { FileRetrivealQAController }
