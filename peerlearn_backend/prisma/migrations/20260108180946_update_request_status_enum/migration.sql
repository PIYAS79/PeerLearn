-- AlterEnum
ALTER TYPE "Request_Status" ADD VALUE 'ACCEPTED';

-- AlterTable
ALTER TABLE "requests" ADD COLUMN     "call_id" TEXT;
