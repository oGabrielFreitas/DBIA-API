import { Router } from 'express'
import { userRouter } from './user.routes'
import { sessionsRouter } from './sessions.routes'
import { filesRouter } from './files.routes'

const routes = Router()

routes.use('/users', userRouter)
// routes.use('/sessions', sessionsRouter)
// routes.use('/files', filesRouter)

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Tudo Ok' })
})

export { routes }
