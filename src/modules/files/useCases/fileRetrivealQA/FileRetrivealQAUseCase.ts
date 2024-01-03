import { RetrievalQAChain, loadQAStuffChain } from 'langchain/chains'
import { llmModel } from '../../../../config/OpenAIConfig'
import { VectorStoreDocumentService } from '../../services/VectorStoreDocumentService'
import { PromptTemplate } from 'langchain/prompts'

interface FileRetrivealQA_DTO {
  query: string
  userId: string
}

interface FileRetrivealQA_Response_DTO {
  answer: string
}

class FileRetrivealQAUseCase {
  async execute({
    query,
    userId,
  }: FileRetrivealQA_DTO): Promise<FileRetrivealQA_Response_DTO> {
    const vectorStoreService = new VectorStoreDocumentService()

    const vectorStore = await vectorStoreService.load()

    const template = `
    Você é um chatbot que foi treinado para realizar atendimento e tirar dúvidas sobre a Universidade Federal de Santa Maria.
    Use o contexto abaixo para tentar encontrar a melhor resposta possível, se disponível, cite também o artigo relacionado.
    Se não encontrar resposta, não invente, apenas diga que deve entrar em contato pelo e-mail contato@ufsm.br

    Contexto: {context}

    Question: {question}?`

    const QA_CHAIN_PROMPT = new PromptTemplate({
      inputVariables: ['context', 'question'],
      template,
    })

    // const chain = RetrievalQAChain.fromLLM(
    //   llmModel,
    //   vectorStore.asRetriever(2),
    //   {
    //     returnSourceDocuments: false, // Can also be passed into the constructor
    //     verbose: true,
    //   },
    // )

    const chain = new RetrievalQAChain({
      combineDocumentsChain: loadQAStuffChain(llmModel, {
        prompt: QA_CHAIN_PROMPT,
      }),
      retriever: vectorStore.asRetriever(2, {
        userOwnerId: userId,
      }),
      returnSourceDocuments: true,
      verbose: true,
    })

    // console.log(chain)

    const chainAnswer = await chain.call({
      query,
    })

    return {
      answer: chainAnswer.text, // OFICIAL
      // answer: chainAnswer, // ONLY DEV RETURN
    }
  }
}

export { FileRetrivealQAUseCase }
