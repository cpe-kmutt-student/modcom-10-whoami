/*
  Warnings:

  - A unique constraint covering the columns `[fyuser_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "fyuser_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_fyuser_id_key" ON "user"("fyuser_id");

-- AddForeignKey
ALTER TABLE "FirstYearUser" ADD CONSTRAINT "FirstYearUser_fyuser_id_fkey" FOREIGN KEY ("fyuser_id") REFERENCES "user"("fyuser_id") ON DELETE RESTRICT ON UPDATE CASCADE;
