/*
  Warnings:

  - You are about to drop the column `user_id` on the `Person` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_user_id_fkey";

-- DropIndex
DROP INDEX "Person_user_id_key";

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "user_id",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
