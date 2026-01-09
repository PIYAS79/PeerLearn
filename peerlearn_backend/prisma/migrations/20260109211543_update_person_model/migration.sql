/*
  Warnings:

  - Added the required column `req_maker_id` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_user_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "req_maker_id" TEXT NOT NULL,
ADD COLUMN     "target_user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_req_maker_id_fkey" FOREIGN KEY ("req_maker_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_target_user_id_fkey" FOREIGN KEY ("target_user_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
