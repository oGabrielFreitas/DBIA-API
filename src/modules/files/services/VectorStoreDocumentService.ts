import { embeddingsOpenAI } from '../../../config/OpenAIConfig'
import { Document } from 'langchain/dist/document'
import { PGVectorStore } from 'langchain/vectorstores/pgvector'

import { pgConfig } from '../../../config/PgVectorConfig'
import { MyPrismaClient } from '../../../config/PrismaClientConfig'

interface SaveInput {
  docs: Document[]
}

interface LoadInput {
  query: string
  userId: string
}

class VectorStoreDocumentService {
  private async connect() {
    return await PGVectorStore.initialize(embeddingsOpenAI, pgConfig)
  }

  async save({ docs }: SaveInput): Promise<void> {
    const pgvectorStore = await this.connect()

    await pgvectorStore.addDocuments(docs)

    await pgvectorStore.end()
  }

  async load(): Promise<PGVectorStore> {
    const pgvectorStore = await this.connect()

    return pgvectorStore
  }

  async listEmbeddingsByDocument(fileId: string): Promise<number> {
    const getEmbeddings = await MyPrismaClient.documentVector.findMany({
      where: {
        metadata: {
          path: ['savedFileId'],
          equals: fileId,
        },
      },
    })
    return getEmbeddings.length + 1
  }
}

export { VectorStoreDocumentService }

// await pgvectorStore.delete({
//   filter: {
//     userOwnerId: 'd673ea0b-53c7-4207-accd-78850f7ec9fa',
//   },
// })
// const results = await pgvectorStore.similaritySearch(
//   // Query buscada
//   'de dois docentes representantes da área de concentração. Nos cursos ',
//   // Número de conxtextos retornados
//   2,
//   // Filtro para buscar pelo id do usuário logado
//   // Eventualmente quero implmentar algo capaz de criar coleções
//   {
//     // userOwnerId: 'd673ea0b-53c7-4207-accd-78850f7ec9fa',
//   },
// )
