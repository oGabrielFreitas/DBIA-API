// import path from 'path'
// import crypto from 'crypto'
import multer from 'multer'

export const DocumentUploadConfig = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 20, // Limita o tamanho do arquivo para 20MB, ajuste conforme necessário
  },
}

// Maneira antiga, que salva o arquivo em um diretório

// export default {
//   storage: multer.diskStorage({
//     destination: path.resolve(__dirname, '..', '..', 'tmp'),
//     filename(request, file, callback) {
//       const fileHash = crypto.randomBytes(10).toString('hex')
//       const fileName = `${fileHash}-${file.originalname}`

//       return callback(null, fileName)
//     },
//   }),
// }
