import { type Request, type Response } from 'express'
import { TransfDataSetCreatorUseCase } from './TransfDataSetCreatorUseCase'

class TransfDataSetCreatorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request
    const userId = request.user.id
    // const collectionId = request.body.collection_id // Implementar depois...

    const transfDataSetCreatorUseCase = new TransfDataSetCreatorUseCase()

    if (!file) {
      return response.status(400).json({ message: 'File is missing' })
    }

    try {
      const message = await transfDataSetCreatorUseCase.execute({
        userId,
        file,
      })
      return response.status(200).json(message)
    } catch (err) {
      return response.status(400).json({ message: err.message })
    }
  }
}

export { TransfDataSetCreatorController }
