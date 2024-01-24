import { PoolConfig } from 'pg'
import 'dotenv/config'
import { URL } from 'url'

// Lógica para usar as mesmas informações da env query DATABASE_URL do prisma
const dbUrl = process.env.DATABASE_URL ?? ''
const parsedUrl = new URL(dbUrl)
const devMode = process.env.DEV_MODE

const sslMode = () => {
  if (devMode === 'true') {
    return false
  }
  return true
}

const pgConfig = {
  postgresConnectionOptions: {
    type: 'postgres',
    host: parsedUrl.hostname,
    port: parseInt(parsedUrl.port, 10) ?? 5432,
    user: parsedUrl.username,
    password: parsedUrl.password,
    database: parsedUrl.pathname.split('/')[1],
    ssl: sslMode(),
  } as PoolConfig,

  // Definições da tabela que armazena documentos vetorizados (embeddings)
  tableName: 'document_vector',
  columns: {
    idColumnName: 'id',
    vectorColumnName: 'embedding',
    contentColumnName: 'content',
    metadataColumnName: 'metadata',
  },
}

export { pgConfig }
