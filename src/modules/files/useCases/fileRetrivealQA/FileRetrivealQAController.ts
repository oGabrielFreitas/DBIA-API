import { type Request, type Response } from 'express'
import { FileRetrivealQAUseCase } from './FileRetrivealQAUseCase'

class FileRetrivealQAController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { query } = request.body

    const fileRetrivealQA = new FileRetrivealQAUseCase()

    try {
      const upload = await fileRetrivealQA.execute({ query })

      return response.status(200).json(upload)
    } catch (err) {
      return response.status(400).json({ message: err.message })
    }
  }
}

export { FileRetrivealQAController }
