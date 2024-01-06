import { MyPrismaClient } from '../../../../config/PrismaClientConfig'

interface FileList_request {
  userId: string
}

interface FileList_response {
  file_id: string
  file_name: string
  create_at: Date
}

class FileListUseCase {
  async execute({ userId }: FileList_request): Promise<FileList_response[]> {
    const filesList = await MyPrismaClient.uplodadedFile.findMany({
      where: { user_owner_id: userId },
    })

    const filesArray = filesList.map(
      ({ id, file_name, embeddings_useds, create_at }) => {
        // Transformar e retornar o novo objeto
        return { file_id: id, file_name, embeddings_useds, create_at }
      },
    )

    return filesArray
  }
}

export { FileListUseCase }
