-- CreateEnum
CREATE TYPE "Review_Status" AS ENUM ('PENDING');

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "req_maker_id" TEXT NOT NULL,
    "target_user_id" TEXT NOT NULL,
    "ai_rating" INTEGER NOT NULL,
    "human_rating" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "course_title" "Academic_Courses" NOT NULL,
    "course_code" TEXT,
    "topic" TEXT NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_req_maker_id_fkey" FOREIGN KEY ("req_maker_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_target_user_id_fkey" FOREIGN KEY ("target_user_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
