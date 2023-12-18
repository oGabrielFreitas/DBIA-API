import { PDFLoader } from 'langchain/document_loaders/fs/pdf'

import { VectorStoreDocumentService } from '../../services/VectorStoreDocumentService'

// import fs from 'fs'

interface FileUpload {
  file: Express.Multer.File
}

class FileUploadUseCase {
  async execute({ file }: FileUpload): Promise<void> {
    const loader = new PDFLoader(file.path)

    const docs = await loader.load()

    const vectorStoreService = new VectorStoreDocumentService()

    const directory = './teste'

    await vectorStoreService.save({ docs, directory })
  }
}

export { FileUploadUseCase }

// // LER PDF POR STREAM? APRIMORAR DEPOIS
// const stream = fs.createReadStream(file.path);
// const data = fs.readFileSync(file.path);
// console.log(data)
// // res.contentType("application/pdf");
// // res.send(data);
// // stream.pipe()
