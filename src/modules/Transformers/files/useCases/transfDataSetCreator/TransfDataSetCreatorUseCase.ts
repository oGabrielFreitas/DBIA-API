import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { OpenAIApi } from '../../../../../config/OpenAIConfig'

import * as fsPromises from 'fs/promises'

interface FileUpload {
  userId: string
  file: Express.Multer.File
}

interface UploadResponse {
  message: string
}

class TransfDataSetCreatorUseCase {
  /**
   * ATENÇÃO!!! ESTE CÓDIGO ESTÁ RETORNANDO INDEXES IMPRECISOS POR CONTA DA FORMATAÇÃO DO JSON QUE VEM, QUANDO ELE TIRA OS \N PERDE-SE INFORMAÇÃO. PRECISA-SE OS DADOS QUE SÃO ENVIADOS AO CHAT GPTOLIS
   * @param param0
   * @returns
   */
  async execute({ userId, file }: FileUpload): Promise<UploadResponse> {
    // Transforma o Buffer do arquivo em Blob
    const fileBlob = new Blob([file.buffer], { type: 'application/pdf' })

    // Load no arquivo, com PDFLoader
    const loader = new PDFLoader(fileBlob)
    const docs = await loader.load()

    const pageNoN = docs[5].pageContent.replace(/(\r\n|\n|\r)/gm, '')

    // return pageNoN.trim()

    const aiPrompt = `
    Estruture um OBEJTO_JSON seguindo este formato:
    1. "question": Uma pergunta derivada do contexto fornecido.
    2. "answer": Uma resposta concisa, com no máximo 30 palavras, extraída do contexto.
    3. "context": Um fragmento de texto relevante do qual a pergunta e a resposta são derivadas.
    4. "answer_indexes": Os índices inicial e final no array de caracteres do "context", indicando onde a "answer" pode ser encontrada.
    Utilize o texto fornecido pelo usuário para criar dois OBEJTO_JSON distintos, cada um contendo "question", "answer", "context", e "answer_indexes".`

    async function createDataSetByPage(docPageText): string {
      const completion = await OpenAIApi.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
              'Você é um assistente que gera datasets. Sua resposta deve ser em formato JSON, havendo nessa estrutura: {"data": [ OBJETO_JSON_1, OBJETO_JSON_2]}.',
          },
          {
            role: 'user',
            content: `${aiPrompt}

            Crie a partir deste texto: ${docPageText}`,
          },
        ],
        model: 'gpt-3.5-turbo-1106',
        response_format: { type: 'json_object' },
      })
      return completion.choices[0].message.content as string
    }

    async function appendDataToFile(newData, filePath) {
      try {
        let existingData

        // Tenta ler o arquivo e fazer o parse do conteúdo como um array
        try {
          const fileContent = await fsPromises.readFile(filePath, 'utf8')
          existingData = JSON.parse(fileContent)
        } catch (error) {
          // Se o arquivo estiver vazio ou mal formatado, inicializa um novo array
          console.error(
            'Erro ao ler ou parsear o arquivo existente. Inicializando um novo array:',
            error,
          )
          existingData = []
        }

        // Adiciona os novos dados ao array existente
        const updatedData = existingData.concat(newData)

        // Escreve o array atualizado de volta no arquivo
        await fsPromises.writeFile(
          filePath,
          JSON.stringify(updatedData, null, 2),
          'utf8',
        )
      } catch (error) {
        console.error('Erro ao manipular o arquivo JSON:', error)
        throw error
      }
    }

    const filePath = './tmp/DataSet.json'
    let loopCounter = 0
    let index = 0

    // return docs[0]

    // Caminho para o arquivo JSON no servidor

    const aiCompletion = await createDataSetByPage(pageNoN.trim())

    return aiCompletion

    // console.log(aqui)
    const jsonParsed = JSON.parse(aiCompletion)

    const processedData = jsonParsed.data.map((obj) => ({
      ...obj,
      loop_number: loopCounter,
      page_number: docs[20].metadata.loc.pageNumber,
    }))

    // Adiciona os dados ao arquivo JSON
    // await appendDataToFile(processedData, filePath)

    return processedData

    console.log('antes do try')

    try {
      console.log('entrou do try')

      // return true

      /**
       * Loop que envia requisição à OpenAI api, 1 página por vez, recebe 2 contextos como retorno
       * adiciona o contexto à um .txt
       */
      for await (const splittedPage of docs) {
        // docs.forEach(async (splittedPage) => {

        if (index >= 47) {
          console.log('entrou no for')
          const aiCompletion = await createDataSetByPage(
            splittedPage.pageContent,
          )
          const jsonParsed = JSON.parse(aiCompletion)

          console.log(jsonParsed)

          const processedData = jsonParsed.data.map((obj) => ({
            ...obj,
            loop_number: loopCounter,
            page_number: splittedPage.metadata.loc.pageNumber,
          }))

          console.log(processedData)

          // Adiciona os dados ao arquivo JSON
          await appendDataToFile(processedData, filePath)

          loopCounter++
        }
        index++
      }
    } catch (err) {
      throw new Error(err.message)
      throw new Error('Database file saving error!')
    }

    return { message: 'Arquivo processado com sucesso!' }
  }
}

export { TransfDataSetCreatorUseCase }

// // LER PDF POR STREAM? APRIMORAR DEPOIS
// const stream = fs.createReadStream(file.path);
// const data = fs.readFileSync(file.path);
// console.log(data)
// // res.contentType("application/pdf");
// // res.send(data);
// // stream.pipe()
