/*
  Warnings:

  - You are about to drop the column `fyuser_uuid` on the `FirstYearQuest` table. All the data in the column will be lost.
  - The primary key for the `FirstYearUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `syuser_uuid` on the `SecondYearContact` table. All the data in the column will be lost.
  - The primary key for the `SecondYearUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[fyuser_uuid]` on the table `FirstYearUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[syuser_uuid]` on the table `SecondYearUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fyuser_id` to the `FirstYearQuest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `syuser_id` to the `SecondYearContact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FirstYearQuest" DROP CONSTRAINT "FirstYearQuest_fyuser_uuid_fkey";

-- DropForeignKey
ALTER TABLE "SecondYearContact" DROP CONSTRAINT "SecondYearContact_syuser_uuid_fkey";

-- DropIndex
DROP INDEX "FirstYearUser_fyuser_id_key";

-- AlterTable
ALTER TABLE "FirstYearQuest" DROP COLUMN "fyuser_uuid",
ADD COLUMN     "fyuser_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FirstYearUser" DROP CONSTRAINT "FirstYearUser_pkey",
ADD CONSTRAINT "FirstYearUser_pkey" PRIMARY KEY ("fyuser_id");

-- AlterTable
ALTER TABLE "SecondYearContact" DROP COLUMN "syuser_uuid",
ADD COLUMN     "syuser_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SecondYearUser" DROP CONSTRAINT "SecondYearUser_pkey",
ADD CONSTRAINT "SecondYearUser_pkey" PRIMARY KEY ("syuser_id");

-- CreateIndex
CREATE UNIQUE INDEX "FirstYearUser_fyuser_uuid_key" ON "FirstYearUser"("fyuser_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SecondYearUser_syuser_uuid_key" ON "SecondYearUser"("syuser_uuid");

-- AddForeignKey
ALTER TABLE "FirstYearQuest" ADD CONSTRAINT "FirstYearQuest_fyuser_id_fkey" FOREIGN KEY ("fyuser_id") REFERENCES "FirstYearUser"("fyuser_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecondYearContact" ADD CONSTRAINT "SecondYearContact_syuser_id_fkey" FOREIGN KEY ("syuser_id") REFERENCES "SecondYearUser"("syuser_id") ON DELETE RESTRICT ON UPDATE CASCADE;
