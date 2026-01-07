/*
  Warnings:

  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Academic_Level" AS ENUM ('L1', 'L2', 'L3', 'L4');

-- CreateEnum
CREATE TYPE "Academic_Term" AS ENUM ('T1', 'T2', 'T3');

-- CreateEnum
CREATE TYPE "Academic_Courses" AS ENUM ('OS', 'DMML', 'MAD', 'AI', 'WEB_ENGINEERING');

-- CreateEnum
CREATE TYPE "Academic_Deprartment" AS ENUM ('CSE', 'CIS', 'SWE', 'EEE', 'MCT', 'ESDM', 'PHRM', 'TEX');

-- CreateEnum
CREATE TYPE "Expertise_Level" AS ENUM ('EXPERT', 'BEGINNER');

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_email_fkey";

-- DropTable
DROP TABLE "Person";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Person_Role" NOT NULL DEFAULT 'STUDENT',
    "status" "User_Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persons" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "photo_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "bkash" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_informations" (
    "id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "department" "Academic_Deprartment" NOT NULL,
    "level" "Academic_Term" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_informations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expertises" (
    "id" TEXT NOT NULL,
    "course_title" "Academic_Courses" NOT NULL,
    "course_code" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "level" "Expertise_Level" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expertises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person_Expertise" (
    "expertise_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,

    CONSTRAINT "Person_Expertise_pkey" PRIMARY KEY ("expertise_id","person_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "persons_email_key" ON "persons"("email");

-- CreateIndex
CREATE UNIQUE INDEX "academic_informations_person_id_key" ON "academic_informations"("person_id");

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_informations" ADD CONSTRAINT "academic_informations_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person_Expertise" ADD CONSTRAINT "Person_Expertise_expertise_id_fkey" FOREIGN KEY ("expertise_id") REFERENCES "expertises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person_Expertise" ADD CONSTRAINT "Person_Expertise_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
