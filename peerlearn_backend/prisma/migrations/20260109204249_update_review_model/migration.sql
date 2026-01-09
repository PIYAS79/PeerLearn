/*
  Warnings:

  - You are about to drop the column `req_maker_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `target_user_id` on the `reviews` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_req_maker_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_target_user_id_fkey";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "req_maker_id",
DROP COLUMN "target_user_id";
