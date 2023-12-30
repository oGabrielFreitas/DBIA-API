import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { MyPrismaClient } from '../../../../config/PrismaClientConfig'

import { VectorStoreDocumentService } from '../../services/VectorStoreDocumentService'

// import fs from 'fs'

interface FileUpload {
  userId: string
  file: Express.Multer.File
}

interface UploadResponse {
  message: string
}

class FileUploadUseCase {
  async execute({ userId, file }: FileUpload): Promise<UploadResponse> {
    // Transforma o Buffer do arquivo em Blob
    const fileBlob = new Blob([file.buffer], { type: 'application/pdf' })

    // Load no arquivo, com PDFLoader
    const loader = new PDFLoader(fileBlob)
    const docs = await loader.load()

    // try {
    // Salva o buffer do arquivo no bando de dados como binário.
    const savedFile = await MyPrismaClient.uplodadedFile.create({
      data: {
        userOwnerId: userId, // ID do usuário que possui o arquivo
        fileName: file.originalname, // Nome original do arquivo
        data: file.buffer, // Salvando o buffer no banco de dados
      },
    })

    // Chama a função de vector store do FAISS STORE
    const vectorStoreService = new VectorStoreDocumentService()
    const directory = './teste'
    await vectorStoreService.save({ docs, fileOwnerId: savedFile.id })

    //
    // } catch (err) {
    //   throw new Error('Database file saving error!')
    // }

    return { message: 'Arquivo processado com sucesso!' }
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
