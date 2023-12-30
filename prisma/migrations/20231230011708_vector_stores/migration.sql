-- CreateTable
CREATE TABLE "faiss_documents" (
    "id" TEXT NOT NULL,
    "fileOwnerId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faiss_documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "faiss_documents" ADD CONSTRAINT "faiss_documents_fileOwnerId_fkey" FOREIGN KEY ("fileOwnerId") REFERENCES "uploaded_file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
