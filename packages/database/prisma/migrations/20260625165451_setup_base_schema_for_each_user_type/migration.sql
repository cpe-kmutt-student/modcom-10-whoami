-- CreateEnum
CREATE TYPE "ContactPlatform" AS ENUM ('instagram', 'line', 'facebook', 'roblox', 'discord', 'wechat', 'tiktok', 'whatsapp', 'twitter', 'threads', 'shopee', 'lazada', 'youtube', 'zoom', 'modlink', 'github', 'tinder', 'omi', 'bankpassword', 'atmcardnumber', 'phonenumber', 'email', 'telegraph', 'address', 'ipaddress', 'calculator', 'nokia3310', 'other');

-- CreateTable
CREATE TABLE "FirstYearUser" (
    "fyuser_uuid" TEXT NOT NULL,
    "fyuser_id" TEXT NOT NULL,
    "fyuser_firstname" VARCHAR(50) NOT NULL,
    "fyuser_lastname" VARCHAR(50) NOT NULL,
    "fyuser_email" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FirstYearUser_pkey" PRIMARY KEY ("fyuser_uuid")
);

-- CreateTable
CREATE TABLE "FirstYearQuest" (
    "fyquest_id" SERIAL NOT NULL,
    "fyquest_details" TEXT NOT NULL,
    "fyuser_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FirstYearQuest_pkey" PRIMARY KEY ("fyquest_id")
);

-- CreateTable
CREATE TABLE "SecondYearUser" (
    "syuser_uuid" TEXT NOT NULL,
    "syuser_id" TEXT NOT NULL,
    "syuser_firstname" VARCHAR(50) NOT NULL,
    "syuser_lastname" VARCHAR(50) NOT NULL,
    "syuser_email" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecondYearUser_pkey" PRIMARY KEY ("syuser_uuid")
);

-- CreateTable
CREATE TABLE "SecondYearContact" (
    "sycontact_id" SERIAL NOT NULL,
    "sycontact_platform" "ContactPlatform" NOT NULL DEFAULT 'other',
    "sycontact_detail" TEXT NOT NULL,
    "syuser_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecondYearContact_pkey" PRIMARY KEY ("sycontact_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FirstYearUser_fyuser_id_key" ON "FirstYearUser"("fyuser_id");

-- CreateIndex
CREATE UNIQUE INDEX "SecondYearUser_syuser_id_key" ON "SecondYearUser"("syuser_id");

-- AddForeignKey
ALTER TABLE "FirstYearQuest" ADD CONSTRAINT "FirstYearQuest_fyuser_uuid_fkey" FOREIGN KEY ("fyuser_uuid") REFERENCES "FirstYearUser"("fyuser_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecondYearContact" ADD CONSTRAINT "SecondYearContact_syuser_uuid_fkey" FOREIGN KEY ("syuser_uuid") REFERENCES "SecondYearUser"("syuser_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
