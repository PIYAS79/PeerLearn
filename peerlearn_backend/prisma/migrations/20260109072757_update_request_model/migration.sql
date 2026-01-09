-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_target_user_id_fkey";

-- AlterTable
ALTER TABLE "requests" ALTER COLUMN "target_user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_target_user_id_fkey" FOREIGN KEY ("target_user_id") REFERENCES "persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
