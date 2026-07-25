/*
  Warnings:

  - You are about to drop the `FirstYearUserOnUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FirstYearUserOnUser" DROP CONSTRAINT "FirstYearUserOnUser_fyuser_email_fkey";

-- DropForeignKey
ALTER TABLE "FirstYearUserOnUser" DROP CONSTRAINT "FirstYearUserOnUser_user_email_fkey";

-- DropTable
DROP TABLE "FirstYearUserOnUser";

-- CreateTable
CREATE TABLE "FirstYearUserAndUserJoiner" (
    "id" SERIAL NOT NULL,
    "fyuser_email" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FirstYearUserAndUserJoiner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FirstYearUserAndUserJoiner" ADD CONSTRAINT "FirstYearUserAndUserJoiner_fyuser_email_fkey" FOREIGN KEY ("fyuser_email") REFERENCES "FirstYearUser"("fyuser_email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirstYearUserAndUserJoiner" ADD CONSTRAINT "FirstYearUserAndUserJoiner_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "user"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
