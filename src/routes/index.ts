import { Router } from 'express'
import { userRouter } from './user.routes'
import { sessionsRouter } from './sessions.routes'
import { filesRouter } from './files.routes'
import { transformersRouter } from './transformers.routes'

const routes = Router()

routes.use('/users', userRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/files', filesRouter)
routes.use('/transformers', transformersRouter)

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Servidor online...' })
})

export { routes }
