import { embeddingsOpenAI } from '../../../config/OpenAIConfig'
import { FaissStore } from 'langchain/vectorstores/faiss'

// import { PrismaVectorStore } from 'langchain/vectorstores/prisma'
// import { Prisma, Document } from '@prisma/client'

// import { type Document } from 'langchain/dist/document'

import { Document } from 'langchain/dist/document'

import { MyPrismaClient } from '../../../config/PrismaClientConfig'

import { PrismaVectorStore } from 'langchain/vectorstores/prisma'
import { Prisma, DocumentVector } from '@prisma/client'

interface SaveInput {
  docs: Document[]
  fileOwnerId: string
}

interface LoadInput {
  directory: string
}

class VectorStoreDocumentService {
  async save({ docs, fileOwnerId }: SaveInput): Promise<void> {
    // const vectorStore = await FaissStore.fromDocuments(docs, embeddingsOpenAI)

    // const vectorStore = await FaissStore.fromDocuments(docs, embeddingsOpenAI)

    // const jsonString = JSON.stringify(vectorStore)

    // console.log(jsonString)

    // await vectorStore.save('./tmp')

    // return 1

    //
    //
    //
    //
    //

    // return docs

    // // const teste = await MyPrismaClient.documentVector.create({
    // //   data: { content: 'Novo teste' },
    // // })

    // // console.log(teste)

    // Use the `withModel` method to get proper type hints for `metadata` field:
    const vectorStore = PrismaVectorStore.withModel<DocumentVector>(
      MyPrismaClient,
    ).create(embeddingsOpenAI, {
      prisma: Prisma,
      tableName: 'DocumentVector',
      vectorColumnName: 'vector',
      columns: {
        id: PrismaVectorStore.IdColumn,
        content: PrismaVectorStore.ContentColumn,
      },
    })

    // await vectorStore.addModels([
    //   { id: 'clqsvz7bp0000nqasdvtyldontwf', content: 'Noooooooooovo teste' },
    // ])

    // const newDocument = new Document({
    //   id: 'clqsvz7b00nqvtyldontwf',
    //   content: docs,
    // })

    // await vectorStore.addDocuments([newDocument])

    // // await vectorStore.addDocuments([docs])

    // console.log('chegou aqui')

    // const texts = ['Hello world']
    // await vectorStore.addModels(
    //   await MyPrismaClient.$transaction(
    //     texts.map((content) =>
    //       MyPrismaClient.documentVector.create({ data: { content } }),
    //     ),
    //   ),
    // )

    // const texts = [docs]
    // await vectorStore.addDocuments(
    //   await MyPrismaClient.$transaction(
    //     texts.map((content) =>
    //       MyPrismaClient.documentVector.create({ data: { content } }),
    //     ),
    //   ),
    // )

    await vectorStore.addDocuments([
      await MyPrismaClient.documentVector.create({
        data: { content: docs },
      }),
    ])

    // await vectorStore.addModels([
    //   await MyPrismaClient.documentVector.create({ data: { content: 'Hello World' } })
    // ]);

    // const resultOne = await vectorStore.similaritySearch('UFSM', 1)
    // console.log(resultOne)
    //
    //
    //
    //
    //
    //
    //

    // // Salva o buffer do arquivo no banco de dados como binário.
    // const savedVector = await MyPrismaClient.faissDocumentVector.create({
    //   data: {
    //     fileOwnerId, // ID do usuário que possui o arquivo
    //     docstoreJson: vectorJSON, // Salvando o buffer no banco de dados
    //   },
    // })

    // console.log(savedVector)

    // await vectorStore.save('/tempDir/myFile')
    // await vectorStore.save('/tempDir')
  }

  async load({ directory }: LoadInput): Promise<FaissStore> {
    const loadedVectorStore = await FaissStore.load(directory, embeddingsOpenAI)

    return loadedVectorStore
  }
}

export { VectorStoreDocumentService }
