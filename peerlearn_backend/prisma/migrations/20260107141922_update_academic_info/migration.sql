/*
  Warnings:

  - Added the required column `term` to the `academic_informations` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `level` on the `academic_informations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "academic_informations" ADD COLUMN     "term" "Academic_Term" NOT NULL,
DROP COLUMN "level",
ADD COLUMN     "level" "Academic_Level" NOT NULL;
