/*
  Warnings:

  - You are about to drop the `person_expertises` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `person_id` to the `expertises` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "person_expertises" DROP CONSTRAINT "person_expertises_expertise_id_fkey";

-- DropForeignKey
ALTER TABLE "person_expertises" DROP CONSTRAINT "person_expertises_person_id_fkey";

-- AlterTable
ALTER TABLE "expertises" ADD COLUMN     "person_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "person_expertises";

-- AddForeignKey
ALTER TABLE "expertises" ADD CONSTRAINT "expertises_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
