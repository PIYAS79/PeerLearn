/*
  Warnings:

  - The primary key for the `requests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `req_id` on the `requests` table. All the data in the column will be lost.
  - The required column `id` was added to the `requests` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "requests" DROP CONSTRAINT "requests_pkey",
DROP COLUMN "req_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "requests_pkey" PRIMARY KEY ("id");
