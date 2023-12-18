import { type Request, type Response } from 'express'
import { FileUploadUseCase } from './FileUploadUseCase'

class FileUploadedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request

    const fileUploader = new FileUploadUseCase()

    if (!file) {
      return response.status(400).json({ message: 'File is missing' })
    }

    try {
      await fileUploader.execute({ file })
      return response.status(200).send()
    } catch (err) {
      return response.status(400).json({ message: err.message })
    }
  }
}

export { FileUploadedController }
