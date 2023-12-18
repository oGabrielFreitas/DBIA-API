import { embeddingsOpenAI } from '../../../config/OpenAIConfig'
import { FaissStore } from 'langchain/vectorstores/faiss'

import { type Document } from 'langchain/dist/document'

interface SaveInput {
  docs: Document[]
  directory: string
}

interface LoadInput {
  directory: string
}

class VectorStoreDocumentService {
  async save({ docs, directory }: SaveInput): Promise<void> {
    const vectorStore = await FaissStore.fromDocuments(docs, embeddingsOpenAI)

    console.log(vectorStore)

    await vectorStore.save(directory)
  }

  async load({ directory }: LoadInput): Promise<FaissStore> {
    const loadedVectorStore = await FaissStore.load(directory, embeddingsOpenAI)

    return loadedVectorStore
  }
}

export { VectorStoreDocumentService }
