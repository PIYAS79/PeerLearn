/*
  Warnings:

  - Added the required column `teaching_category` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Teaching_Category" AS ENUM ('BELOW_AVERAGE', 'AVERAGE', 'EXCELLENT');

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "teaching_category" "Teaching_Category" NOT NULL;
