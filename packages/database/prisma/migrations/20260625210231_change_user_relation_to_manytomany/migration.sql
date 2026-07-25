-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_email_fkey";

-- CreateTable
CREATE TABLE "FirstYearUserOnUser" (
    "id" SERIAL NOT NULL,
    "fyuser_email" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FirstYearUserOnUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FirstYearUserOnUser" ADD CONSTRAINT "FirstYearUserOnUser_fyuser_email_fkey" FOREIGN KEY ("fyuser_email") REFERENCES "FirstYearUser"("fyuser_email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirstYearUserOnUser" ADD CONSTRAINT "FirstYearUserOnUser_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "user"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
