import type { Request } from "express";
import type { AI_Question_Type, Upload_File_Type } from "./question.interface";
import Final_App_Error from "../../errors/Final_App_Error";
import httpStatus from 'http-status-codes';
import type { JwtPayload } from "jsonwebtoken";
import { prisma } from '../../lib/prisma';
import { extractText } from "../../utils/extractText";
import { buildPrompt } from "../../utils/buildPrompt";
import { openai } from "../../utils/aiClient";



const create_questions = async (req: Request & { user?: JwtPayload }) => {
    const file = req.file as Upload_File_Type
    if (!file) {
        throw new Final_App_Error(httpStatus.BAD_REQUEST, "Please upload the file")
    }
    const { req_id } = req.params;
    const token_data = req.user;
    const { prompt } = req.body;

    if (!req_id) {
        throw new Final_App_Error(httpStatus.BAD_REQUEST, "request id is required")
    }
    const request = await prisma.request.findUnique({
        where: { id: req_id }
    })
    if (!request) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Request not found");
    }

    // Extract text from file
    const extractedText = await extractText(file);

    // Build AI prompt
    const finalPrompt = buildPrompt({ extractedText, userPrompt: prompt });

    // Call AI 
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: finalPrompt }],
    });

    const choice = completion.choices[0];
    if (!choice || !choice.message) {
        throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR, "AI returned empty response");
    }
    const rawContent = choice.message.content;
    if (!rawContent) {
        throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR, "AI returned empty response");
    }
    // Parse AI JSON
    let questions: AI_Question_Type[];
    try {
        questions = JSON.parse(rawContent);
    } catch {
        throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR, "AI response is not valid JSON");
    }
    // Validation
    if (!Array.isArray(questions) || questions.length !== 5) {
        throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR, "AI must return exactly 5 questions");
    }

    // Prepare Prisma data
    const insertData = questions.map((q, index) => ({
        request_id: req_id,
        question_number: index + 1,
        question: q.question,
        opt_a: q.options[0],
        opt_b: q.options[1],
        opt_c: q.options[2],
        opt_d: q.options[3],
        correct_ans: q.answer,
    }));
    // Insert questions into DB
    const result = await prisma.question_Stack.createMany({
        data: insertData,
    });

    return {
        success: true,
        inserted: result.count,
        request_id: req_id,
    };
}

const get_my_questions = async (request_id: string) => {
    const result = await prisma.question_Stack.findMany({
        where: {
            request_id
        },
        orderBy: {
            question_number: 'asc'
        },
        select: {
            id: true,
            request_id: true,
            question: true,
            question_number: true,
            opt_a: true,
            opt_b: true,
            opt_c: true,
            opt_d: true,
        }
    })
    return result;
}

const check_question_and_create_review = async (request_id: string, data: any) => {
    const request = await prisma.request.findUnique({
        where: { id: request_id }
    })
    if (!request) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Request not found");
    }

    const result = await prisma.$transaction(async (tc) => {
        //check ans
        const questions = await tc.question_Stack.findMany({
            where: {
                request_id: request.id,
            },
            orderBy: {
                question_number: 'asc'
            }
        })
        let ai_mark = 0;

        for (const submitted of data.ans) {
            const matchedQuestion = questions.find(
                q => q.question_number === submitted.question_number
            );

            if (matchedQuestion && matchedQuestion.correct_ans === submitted.ans) {
                ai_mark += 1;
            }
        }
        // update ai mark in request
        await tc.request.update({
            where: { id: request.id },
            data: { ai_rating: ai_mark }
        })
        // delete questions
        await tc.question_Stack.deleteMany({
            where: { request_id: request.id }
        })
        return ai_mark;
    })
    return result;
}


export const Question_Services = {
    create_questions,
    get_my_questions,
    check_question_and_create_review
}