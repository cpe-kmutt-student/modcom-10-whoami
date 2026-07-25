/*
  Warnings:

  - You are about to drop the column `fyquest_details` on the `FirstYearQuest` table. All the data in the column will be lost.
  - Added the required column `fyquest_detail` to the `FirstYearQuest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fyquest_index` to the `FirstYearQuest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FirstYearQuest" DROP COLUMN "fyquest_details",
ADD COLUMN     "fyquest_detail" TEXT NOT NULL,
ADD COLUMN     "fyquest_index" INTEGER NOT NULL;
