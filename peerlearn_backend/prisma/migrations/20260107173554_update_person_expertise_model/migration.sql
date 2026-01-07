/*
  Warnings:

  - You are about to drop the `Person_Expertise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Person_Expertise" DROP CONSTRAINT "Person_Expertise_expertise_id_fkey";

-- DropForeignKey
ALTER TABLE "Person_Expertise" DROP CONSTRAINT "Person_Expertise_person_id_fkey";

-- DropTable
DROP TABLE "Person_Expertise";

-- CreateTable
CREATE TABLE "person_expertises" (
    "expertise_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,

    CONSTRAINT "person_expertises_pkey" PRIMARY KEY ("expertise_id","person_id")
);

-- AddForeignKey
ALTER TABLE "person_expertises" ADD CONSTRAINT "person_expertises_expertise_id_fkey" FOREIGN KEY ("expertise_id") REFERENCES "expertises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_expertises" ADD CONSTRAINT "person_expertises_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
