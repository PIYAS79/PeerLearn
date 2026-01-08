-- CreateTable
CREATE TABLE "question_stack" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "opt_a" TEXT NOT NULL,
    "opt_b" TEXT NOT NULL,
    "opt_c" TEXT NOT NULL,
    "opt_d" TEXT NOT NULL,
    "correct_ans" TEXT NOT NULL,

    CONSTRAINT "question_stack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "question_stack" ADD CONSTRAINT "question_stack_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
