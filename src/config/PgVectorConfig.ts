import { PoolConfig } from 'pg'
import 'dotenv/config'
import { URL } from 'url'

// Lógica para usar as mesmas informações da env query DATABASE_URL do prisma
const dbUrl = process.env.DATABASE_URL ?? ''
const parsedUrl = new URL(dbUrl)

const pgConfig = {
  postgresConnectionOptions: {
    type: 'postgres',
    host: parsedUrl.hostname,
    port: parseInt(parsedUrl.port, 10) ?? 5432,
    user: parsedUrl.username,
    password: parsedUrl.password,
    database: parsedUrl.pathname.split('/')[1],
    ssl: true,
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

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env

const pgConfig2 = {
  postgresConnectionOptions: {
    type: 'postgres',
    host: PGHOST,
    port: 5432,
    user: PGUSER,
    database: PGDATABASE,
    password: PGPASSWORD,
    ssl: true,
    // ssl: 'require',
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
