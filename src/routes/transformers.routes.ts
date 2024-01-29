import { Router } from 'express'
import multer from 'multer'

import { TransformersRetrivealQAController } from '../modules/Transformers/files/useCases/transfRetrivealQA/TransformersRetrivealQAController'
import { TransfDataSetCreatorController } from '../modules/Transformers/files/useCases/transfDataSetCreator/TransfDataSetCreatorController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import { DocumentUploadConfig } from '../config/UploadConfig'

// Router
const transformersRouter = Router()

// Controllers
const transformersRetrivealQAController =
  new TransformersRetrivealQAController()
const transfDataSetCreatorController = new TransfDataSetCreatorController()

// Consts
const upload = multer(DocumentUploadConfig)

// Middlewares
transformersRouter.use(ensureAuthenticated)

// Routes
transformersRouter.post('/ask', transformersRetrivealQAController.handle)

transformersRouter.post(
  '/upload',
  upload.single('uploaded_file'),
  transfDataSetCreatorController.handle,
)

export { transformersRouter }
