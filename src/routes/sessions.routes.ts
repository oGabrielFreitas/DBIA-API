import { Router } from 'express'
import { SessionAuthController } from '../modules/sessions/useCases/sessionAuth/SessionAuthController'

// Router
const sessionsRouter = Router()

// Controllers
const sessionAuthControlle = new SessionAuthController()

// Consts
// Middlewares

// Routes
sessionsRouter.post('/', sessionAuthControlle.handle)

export { sessionsRouter }
