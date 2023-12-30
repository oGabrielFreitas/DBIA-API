import { RetrievalQAChain, loadQAStuffChain } from 'langchain/chains'
import { llmModel } from '../../../../config/OpenAIConfig'
import { VectorStoreDocumentService } from '../../services/VectorStoreDocumentService'
import { PromptTemplate } from 'langchain/prompts'

interface FileRetrivealQA_DTO {
  query: string
}

interface FileRetrivealQA_Response_DTO {
  answer: string
}

class FileRetrivealQAUseCase {
  async execute({
    query,
  }: FileRetrivealQA_DTO): Promise<FileRetrivealQA_Response_DTO> {
    const vectorStoreService = new VectorStoreDocumentService()

    const directory = './teste'

    const vectorStore = await vectorStoreService.load({ directory })

    const promptTemplate = `
    Você é um chatbot que foi treinado para realizar atendimento e tirar dúvidas sobre a Universidade Federal de Santa Maria.
    Use o contexto abaixo para tentar encontrar a melhor resposta possível.
    Se você não encontrar resposta, não invente, apenas diga que a pessoa deve entrar em contato pelo e-mail contato@ufsm.br

    {context}

    Question: {question}`
    const prompt = PromptTemplate.fromTemplate(promptTemplate)

    // const chain = RetrievalQAChain.fromLLM(
    //   llmModel,
    //   vectorStore.asRetriever(2),
    //   {
    //     returnSourceDocuments: false, // Can also be passed into the constructor
    //     verbose: true,
    //   },
    // )

    const chain = new RetrievalQAChain({
      combineDocumentsChain: loadQAStuffChain(llmModel, { prompt }),
      retriever: vectorStore.asRetriever(2),
      returnSourceDocuments: true,
      verbose: false,
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
