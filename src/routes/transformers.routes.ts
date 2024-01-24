import { Router } from 'express'

import { TransformersRetrivealQAController } from '../modules/Transformers/files/useCases/transformersRetrivealQA/TransformersRetrivealQAController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

// Router
const transformersRouter = Router()

// Controllers
const transformersRetrivealQAController =
  new TransformersRetrivealQAController()

// Middlewares
transformersRouter.use(ensureAuthenticated)

// Routes
transformersRouter.post('/ask', transformersRetrivealQAController.handle)

export { transformersRouter }
