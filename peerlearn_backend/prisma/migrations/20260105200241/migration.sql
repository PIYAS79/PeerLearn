/*
  Warnings:

  - Added the required column `updated_at` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Person_Role" AS ENUM ('SUPERADMIN', 'ADMIN', 'STUDENT', 'TEACHER');

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "bkash" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "photo_url" TEXT,
ADD COLUMN     "role" "Person_Role" NOT NULL DEFAULT 'STUDENT',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
