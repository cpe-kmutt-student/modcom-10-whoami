/*
  Warnings:

  - You are about to drop the column `fyuser_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fyuser_email]` on the table `FirstYearUser` will be added. If there are existing duplicate values, this will fail.
  - Made the column `fyuser_email` on table `FirstYearUser` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FirstYearUser" DROP CONSTRAINT "FirstYearUser_fyuser_id_fkey";

-- DropIndex
DROP INDEX "user_fyuser_id_key";

-- AlterTable
ALTER TABLE "FirstYearUser" ALTER COLUMN "fyuser_email" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "fyuser_id";

-- CreateIndex
CREATE UNIQUE INDEX "FirstYearUser_fyuser_email_key" ON "FirstYearUser"("fyuser_email");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_email_fkey" FOREIGN KEY ("email") REFERENCES "FirstYearUser"("fyuser_email") ON DELETE RESTRICT ON UPDATE CASCADE;
