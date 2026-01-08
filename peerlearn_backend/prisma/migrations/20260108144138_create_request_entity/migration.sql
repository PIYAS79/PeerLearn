-- CreateEnum
CREATE TYPE "Request_Status" AS ENUM ('PENDING', 'ONGOING', 'COMPLETED', 'REJECTED');

-- CreateTable
CREATE TABLE "requests" (
    "req_id" TEXT NOT NULL,
    "req_maker_id" TEXT NOT NULL,
    "target_user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "Request_Status" NOT NULL DEFAULT 'PENDING',
    "is_urgent" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("req_id")
);

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_req_maker_id_fkey" FOREIGN KEY ("req_maker_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_target_user_id_fkey" FOREIGN KEY ("target_user_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
