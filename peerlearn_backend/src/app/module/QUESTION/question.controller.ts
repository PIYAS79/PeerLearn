import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from 'http-status-codes';
import { Question_Services } from "./question.services";



const create_questions = Async_Catch(async (req: Request, res: Response) => {
    const result = await Question_Services.create_questions(req);
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Questions created successfully',
        data: result,
    });
})

const get_my_questions = Async_Catch(async (req: Request, res: Response) => {
    const result = await Question_Services.get_my_questions(req.params.id as string);
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Get all questions successfully',
        data: result,
    });
})

const check_question_and_create_review = Async_Catch(async (req: Request, res: Response) => {
    const result = await Question_Services.check_question_and_create_review(req.params.id as string, req.body);
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Review create successfully',
        data: result,
    });
})


export const Question_Controllers = {
    create_questions,
    get_my_questions,
    check_question_and_create_review
}