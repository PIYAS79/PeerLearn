import type { Create_Review_Type, Update_Review_Type } from "./review.interface";
import { prisma } from '../../lib/prisma';
import httpStatus from 'http-status-codes';
import Final_App_Error from "../../errors/Final_App_Error";



const create_review = async (request_id: string, data: Create_Review_Type) => {
    const request = await prisma.request.findUnique({
        where: { id: request_id }
    })
    if (!request) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Request Not found");
    }
    const result = await prisma.review.create({
        data: {
            ai_rating: request.ai_rating as number,
            course_title: data.course_title,
            details: data.details,
            human_rating: data.human_rating,
            teaching_category: data.teaching_category,
            topic: data.topic,
            course_code: data.course_code || '',
            request_id,
            req_maker_id: request.req_maker_id,
            target_user_id: request.target_user_id as string
        }
    })
    return result;
}

const update_review = async (review_id: string, data: Update_Review_Type) => {
    const result = await prisma.review.update({
        where: { id: review_id },
        data
    })
    return result;
}

const delete_review = async (review_id: string) => {
    const result = await prisma.review.delete({
        where: { id: review_id }
    })
    return result;
}

const get_all_review_as_req_maker = async (req_maker_id: string) => {
    console.log("Maker");
    const result = await prisma.review.findMany({
        where: { req_maker_id: req_maker_id }
    })
    return result;
}

const get_all_review_as_target_user = async (target_user_id: string) => {
    console.log("Target");
    const result = await prisma.review.findMany({
        where: { target_user_id: target_user_id }
    })
    return result;
}

const get_all_review = async () => {
    const result = await prisma.review.findMany()
    return result;
}

export const Review_Services = {
    create_review,
    update_review,
    delete_review,
    get_all_review_as_req_maker,
    get_all_review_as_target_user,
    get_all_review
}