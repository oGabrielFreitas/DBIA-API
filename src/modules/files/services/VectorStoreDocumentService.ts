import { embeddingsOpenAI } from '../../../config/OpenAIConfig'
import { FaissStore } from 'langchain/vectorstores/faiss'

import { encode, decode } from '@msgpack/msgpack'

import { Volume } from 'memfs'

import fs from 'fs'

// import {fs}

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

    // // Salva o buffer do arquivo no bando de dados como binário.
    // const savedVector = await MyPrismaClient.faissDocumentVector.create({
    //   data: {
    //     fileOwnerId, // ID do usuário que possui o arquivo
    //     data: jsonBuffer, // Salvando o buffer no banco de dados
    //   },
    // })

    // console.log(savedVector)

    // await vectorStore.save('/tempDir/myFile')
    await vectorStore.save('/tempDir')
  }

  async load({ directory }: LoadInput): Promise<FaissStore> {
    const loadedVectorStore = await FaissStore.load(directory, embeddingsOpenAI)

    return loadedVectorStore
  }
}

export { VectorStoreDocumentService }
