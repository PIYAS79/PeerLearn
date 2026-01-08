import type { Create_Request_Type, Update_Request_Type } from "./request.interface";
import { prisma } from "../../lib/prisma";
import { Request_Status } from "@prisma/client";
import Final_App_Error from "../../errors/Final_App_Error";
import httpStatus from "http-status-codes";


const create_request = async (data: Create_Request_Type) => {
    const req_maker = await prisma.person.findUnique({
        where: { id: data.req_maker_id }
    });
    if (!req_maker) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, 'Request maker not found');
    }
    const target_user = await prisma.person.findUnique({
        where: { id: data.target_user_id }
    });
    if (!target_user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, 'Target user not found');
    }
    if (data.req_maker_id === data.target_user_id) {
        throw new Final_App_Error(httpStatus.BAD_REQUEST, 'Request maker and target user cannot be the same');
    }

    // Find latest request between same users
    const lastRequest = await prisma.request.findFirst({
        where: {
            req_maker_id: data.req_maker_id,
            target_user_id: data.target_user_id
        },
        orderBy: {
            created_at: 'desc'
        }
    });
    if (lastRequest) {
        const now = new Date();
        const lastCreatedAt = new Date(lastRequest.created_at);

        const diffInMinutes =
            (now.getTime() - lastCreatedAt.getTime()) / (1000 * 60);

        if (diffInMinutes < 20) {
            throw new Error(
                `You must wait ${Math.ceil(20 - diffInMinutes)} more minutes before sending another request`
            );
        }
    }

    // Create new request
    const new_request = await prisma.request.create({
        data: {
            req_maker_id: data.req_maker_id,
            target_user_id: data.target_user_id,
            title: data.title,
            message: data.message,
            is_urgent: data.is_urgent ?? false
        }
    });

    return new_request;
};

const update_request = async (request_id: string, data: Update_Request_Type) => {
    const existing_request = await prisma.request.findUnique({
        where: { id: request_id }
    });
    if (!existing_request) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, 'Request not found');
    }

    const updated_request = await prisma.request.update({
        where: { id: request_id },
        data
    });

    return updated_request;
};

const get_requests_as_request_maker = async (req_maker_id: string) => {
    const requests = await prisma.request.findMany({
        where: { req_maker_id }
    });
    return requests;
}

const get_requests_as_target_user = async (target_user_id: string) => {
    const requests = await prisma.request.findMany({
        where: { target_user_id }
    });
    return requests;
}

const delete_request = async (request_id: string) => {
    const existing_request = await prisma.request.findUnique({
        where: { id: request_id }
    });
    if (!existing_request) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, 'Request not found');
    }
    if (existing_request.status !== Request_Status.PENDING) {
        throw new Final_App_Error(httpStatus.BAD_REQUEST, 'Only pending requests can be deleted');
    }
    const result = await prisma.request.delete({
        where: {
            id: request_id,
            status: Request_Status.PENDING
        }
    });
    return result;
}

const get_all_requests = async () => {
    const requests = await prisma.request.findMany({
        orderBy: [
            { is_urgent: 'desc' },
            { created_at: 'desc' }
        ]
    });
    return requests;
}

// the status update api is inside the question_stack module

export const Request_Services = {
    create_request,
    update_request,
    get_requests_as_request_maker,
    get_requests_as_target_user,
    delete_request,
    get_all_requests
}