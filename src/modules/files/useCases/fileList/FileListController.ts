import { type Request, type Response } from 'express'
import { FileListUseCase } from './FileListUseCase'

class FileListController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id

    if (!userId) {
      return response.status(400).json({ message: 'Usuáio inválido!' })
    }

    const fileListUseCase = new FileListUseCase()

    try {
      const answer = await fileListUseCase.execute({ userId })

      return response.status(200).json(answer)
    } catch (err) {
      return response.status(400).json({ message: err.message })
    }
  }
}

export { FileListController }
