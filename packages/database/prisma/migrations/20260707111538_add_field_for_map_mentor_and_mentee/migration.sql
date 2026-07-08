-- CreateTable
CREATE TABLE "FirstYearUserAndSecondYearUserJoiner" (
    "id" SERIAL NOT NULL,
    "fyuser_id" TEXT NOT NULL,
    "syuser_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FirstYearUserAndSecondYearUserJoiner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FirstYearUserAndSecondYearUserJoiner" ADD CONSTRAINT "FirstYearUserAndSecondYearUserJoiner_fyuser_id_fkey" FOREIGN KEY ("fyuser_id") REFERENCES "FirstYearUser"("fyuser_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirstYearUserAndSecondYearUserJoiner" ADD CONSTRAINT "FirstYearUserAndSecondYearUserJoiner_syuser_id_fkey" FOREIGN KEY ("syuser_id") REFERENCES "SecondYearUser"("syuser_id") ON DELETE RESTRICT ON UPDATE CASCADE;
