import { embeddingsOpenAI } from '../../../config/OpenAIConfig'
import { FaissStore } from 'langchain/vectorstores/faiss'

import { type Document } from 'langchain/dist/document'

import { MyPrismaClient } from '../../../config/PrismaClientConfig'

interface SaveInput {
  docs: Document[]
  fileOwnerId: string
}

interface LoadInput {
  directory: string
}

class VectorStoreDocumentService {
  async save({ docs, fileOwnerId }: SaveInput): Promise<void> {
    const vectorStore = await FaissStore.fromDocuments(docs, embeddingsOpenAI)

    // console.log(vectorStore)

    // Salva o buffer do arquivo no bando de dados como binário.
    const savedVector = await MyPrismaClient.faissDocumentVector.create({
      data: {
        fileOwnerId, // ID do usuário que possui o arquivo
        data: file.buffer, // Salvando o buffer no banco de dados
      },
    })

    await vectorStore.save(fileOwnerId)
  }

  async load({ directory }: LoadInput): Promise<FaissStore> {
    const loadedVectorStore = await FaissStore.load(directory, embeddingsOpenAI)

    return loadedVectorStore
  }
}

export { VectorStoreDocumentService }
