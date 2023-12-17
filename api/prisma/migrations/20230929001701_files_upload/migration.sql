-- CreateTable
CREATE TABLE "uploaded_files" (
    "id" TEXT NOT NULL,
    "userOwnerId" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "uploaded_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "uploaded_files" ADD CONSTRAINT "uploaded_files_userOwnerId_fkey" FOREIGN KEY ("userOwnerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
