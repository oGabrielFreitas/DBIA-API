import { RetrievalQAChain, loadQAStuffChain } from 'langchain/chains'
import { llmModel } from '../../../../../config/OpenAIConfig'
import { VectorStoreDocumentService } from '../../../../files/services/VectorStoreDocumentService'
import { PromptTemplate } from 'langchain/prompts'

interface FileRetrivealQA_DTO {
  query: string
  userId: string
  UFSM_FLAG: boolean
}

interface FileRetrivealQA_Response_DTO {
  answer: string
}

class TransformersRetrivealQAUseCase {
  async execute({
    query,
    userId,
    UFSM_FLAG,
  }: FileRetrivealQA_DTO): Promise<FileRetrivealQA_Response_DTO> {
    async function llmCall(data) {
      const response = await fetch(
        // 'https://api-inference.huggingface.co/models/timpal0l/mdeberta-v3-base-squad2',
        // 'https://api-inference.huggingface.co/models/oGabrielFreitas/roberta-teste',
        'https://api-inference.huggingface.co/models/deepset/roberta-base-squad2',
        {
          headers: {
            Authorization: 'Bearer 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',
          },
          method: 'POST',
          body: JSON.stringify(data),
        },
      )
      const result = await response.json()
      return result
    }

    const vectorStoreService = new VectorStoreDocumentService()

    const vectorStore = await vectorStoreService.pgVectorSimilaritySearch({
      query,
      userId,
      pagesToSearch: 2,
    })

    // return { answer: JSON.stringify(vectorStore) }
    // return { answer: vectorStore }

    // let resposta

    // const resposta = await llmCall({
    //   inputs: {
    //     question: 'Qual a idade do rapaz?',
    //     context:
    //       'My name is Gabriel and I live in Berkeley, e eu tenho vinte e sete anos.',
    //   },
    // })

    const resposta = await llmCall({
      inputs: {
        question: query,
        context: JSON.stringify(vectorStore),
      },
    })

    return { answer: resposta.answer }

    // return response.status(200).json({ message: 'ok!' })

    // const vectorStoreService = new VectorStoreDocumentService()

    // const vectorStore = await vectorStoreService.load()

    // let template = ``

    // // if (true) {
    // if (UFSM_FLAG) {
    //   template = `
    //   Você é um chatbot que foi treinado para realizar atendimento e tirar dúvidas sobre a Universidade Federal de Santa Maria.
    //   Use o contexto abaixo para tentar encontrar a melhor resposta possível, se disponível, cite também o artigo relacionado.
    //   Se não encontrar resposta, não invente, apenas diga que deve entrar em contato pelo e-mail contato@ufsm.br

    //   Contexto: {context}

    //   Question: {question}?`
    // } else {
    //   template = `
    //   Você é um chatbot que foi treinado para realizar análise a interpretação de contextos de bancos de dados vetorizados, como arquivos PDF, CSV, MySql entre outros.
    //   Use o contexto abaixo para tentar encontrar a melhor resposta possível, se disponível.
    //   Se não encontrar resposta, não invente, mas você pode tentar fazer buscar em sua base para referências.
    //   Se for perguntado sobre a sua função como chatbot, ignore o contexto abaixo.

    //   Contexto: {context}

    //   Question: {question}?`
    // }

    // const QA_CHAIN_PROMPT = new PromptTemplate({
    //   inputVariables: ['context', 'question'],
    //   template,
    // })

    // // const chain = RetrievalQAChain.fromLLM(
    // //   llmModel,
    // //   vectorStore.asRetriever(2),
    // //   {
    // //     returnSourceDocuments: false, // Can also be passed into the constructor
    // //     verbose: true,
    // //   },
    // // )

    // const chain = new RetrievalQAChain({
    //   combineDocumentsChain: loadQAStuffChain(llmModel, {
    //     prompt: QA_CHAIN_PROMPT,
    //   }),
    //   retriever: vectorStore.asRetriever(2, {
    //     userOwnerId: userId,
    //   }),
    //   returnSourceDocuments: true,
    //   verbose: true,
    // })

    // // console.log(chain)

    // const chainAnswer = await chain.call({
    //   query,
    // })

    // return {
    //   answer: chainAnswer.text, // OFICIAL
    //   // answer: chainAnswer, // ONLY DEV RETURN
    // }
  }
}

export { TransformersRetrivealQAUseCase }
