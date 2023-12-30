import { Router } from 'express'
import { FileUploadedController } from '../modules/files/useCases/fileUpload/FileUploadController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import multer from 'multer'
import { DocumentUploadConfig } from '../config/UploadConfig'
import { FileRetrivealQAController } from '../modules/files/useCases/fileRetrivealQA/FileRetrivealQAController'

// Router
const filesRouter = Router()

// Controllers
const fileUploadController = new FileUploadedController()
const fileRetrivealQAController = new FileRetrivealQAController()

// Consts
const upload = multer(DocumentUploadConfig)

// Middlewares
filesRouter.use(ensureAuthenticated)

// Routes
filesRouter.post(
  '/upload',
  upload.single('uploaded_file'),
  fileUploadController.handle,
)

filesRouter.post('/ask', fileRetrivealQAController.handle)

export { filesRouter }
