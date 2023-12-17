import { FileUploadDTO } from "../../dtos/FileUploadDTO";
import { FileUploadedResponseDTO } from "../../dtos/FileUploadedResponseDTO"

import { PDFLoader } from "langchain/document_loaders/fs/pdf";

import { RetrievalQAChain } from "langchain/chains";
import { VectorStoreDocumentService } from "../../../../services/VectorStoreDocumentService";
import { llmModel } from "../../../../config/OpenAIConfig";
import { OpenAI } from "langchain/llms/openai";

import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

class FileUploadUseCase {

const loader = new PDFLoader(file.path);

const docs = await loader.load();

const texts = docs.map(doc => doc.pageContent);

// const embedded_docs = await embeddings.embedDocuments(texts);

const splitter = new RecursiveCharacterTextSplitter({
  separators: ['Art.'],
  chunkOverlap: 0,
  chunkSize: 1000,
});

const docOutput = await splitter.splitDocuments(docs);

// Load the docs into the vector store

const vectorStoreService = new VectorStoreDocumentService();

await vectorStoreService.save(docOutput, "./teste")

const vectorStore = await vectorStoreService.load("./teste")
