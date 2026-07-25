/*
  Warnings:

  - A unique constraint covering the columns `[syuser_email]` on the table `SecondYearUser` will be added. If there are existing duplicate values, this will fail.
  - Made the column `syuser_email` on table `SecondYearUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SecondYearUser" ALTER COLUMN "syuser_email" SET NOT NULL;

-- CreateTable
CREATE TABLE "SecondYearUserAndUserJoiner" (
    "id" SERIAL NOT NULL,
    "syuser_email" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecondYearUserAndUserJoiner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SecondYearUser_syuser_email_key" ON "SecondYearUser"("syuser_email");

-- AddForeignKey
ALTER TABLE "SecondYearUserAndUserJoiner" ADD CONSTRAINT "SecondYearUserAndUserJoiner_syuser_email_fkey" FOREIGN KEY ("syuser_email") REFERENCES "SecondYearUser"("syuser_email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecondYearUserAndUserJoiner" ADD CONSTRAINT "SecondYearUserAndUserJoiner_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "user"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
