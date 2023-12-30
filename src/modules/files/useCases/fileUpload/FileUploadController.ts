import { type Request, type Response } from 'express'
import { FileUploadUseCase } from './FileUploadUseCase'

class FileUploadedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request
    const userId = request.user.id

    const fileUploader = new FileUploadUseCase()

    if (!file) {
      return response.status(400).json({ message: 'File is missing' })
    }

    try {
      const message = await fileUploader.execute({ userId, file })
      return response.status(200).json(message)
    } catch (err) {
      return response.status(400).json({ message: err.message })
    }
  }
}

export { FileUploadedController }
