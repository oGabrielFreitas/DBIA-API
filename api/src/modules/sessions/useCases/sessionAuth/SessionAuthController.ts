import { Request, Response } from 'express'
import { SessionAuthUseCase } from './SessionAuthUseCase'

export class SessionAuthController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const session = new SessionAuthUseCase()

    try {
      const sessionAuthResponse = await session.execute({ email, password })

      return res.status(200).json(sessionAuthResponse)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
