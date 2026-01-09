import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from 'http-status-codes';
import { Review_Services } from "./review.services";




const create_review = Async_Catch(async (req: Request, res: Response) => {
    const result = await Review_Services.create_review(req.params.id as string, req.body);
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Review created successfully',
        data: result,
    });
})

const update_review = Async_Catch(async (req: Request, res: Response) => {
    const result = await Review_Services.update_review(req.params.id as string, req.body);
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Review update successfully',
        data: result,
    });
})

const delete_review = Async_Catch(async (req: Request, res: Response) => {
    const result = await Review_Services.delete_review(req.params.id as string);
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Review delete successfully',
        data: result,
    });
})

const get_all_review_as_req_maker = Async_Catch(async (req: Request, res: Response) => {
    const result = await Review_Services.get_all_review_as_req_maker(req.params.id as string);
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Get all review successfully',
        data: result,
    });
})

const get_all_review_as_target_user = Async_Catch(async (req: Request, res: Response) => {
    const result = await Review_Services.get_all_review_as_target_user(req.params.id as string);
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Get all review successfully',
        data: result,
    });
})

const get_all_review = Async_Catch(async (req: Request, res: Response) => {
    const result = await Review_Services.get_all_review();
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Get all review successfully',
        data: result,
    });
})


export const Review_Controllers = {
    create_review,
    update_review,
    delete_review,
    get_all_review_as_req_maker,
    get_all_review_as_target_user,
    get_all_review
}