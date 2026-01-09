import type { Create_Request_Type, Update_Request_Status_Type, Update_Request_Type } from "./request.interface";
import { prisma } from "../../lib/prisma";
import { Request_Status } from "@prisma/client";
import Final_App_Error from "../../errors/Final_App_Error";
import httpStatus from "http-status-codes";
import { v4 as uuidv4 } from 'uuid';
import Send_Email from "../../utils/nodemailer";
import { Reqeustf_Overload } from "../../utils/request_overload";




const create_request = async (data: Create_Request_Type) => {
    if (data.req_maker_id === data.target_user_id) {
        throw new Final_App_Error(httpStatus.BAD_REQUEST, 'Request maker and target user cannot be the same');
    }
    const req_maker = await prisma.person.findUnique({
        where: { id: data.req_maker_id }
    });
    if (!req_maker) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, 'Request maker not found');
    }
    let new_request;
    if (data.target_user_id) {
        const target_user = await prisma.person.findUnique({
            where: { id: data.target_user_id }
        });
        if (!target_user) {
            throw new Final_App_Error(httpStatus.NOT_FOUND, 'Target user not found');
        }
        // check if the same user is create another request or not 
        const { success, time } = await Reqeustf_Overload(req_maker.id, target_user.id);
        if (success) {
            throw new Final_App_Error(httpStatus.BAD_REQUEST,
                `You must wait ${time} more minutes before sending another request`
            );
        }
        // Create new request with target_user
        await prisma.$transaction(async (tc) => {
            new_request = await tc.request.create({
                data: {
                    req_maker_id: data.req_maker_id,
                    target_user_id: data.target_user_id,
                    title: data.title,
                    message: data.message,
                    is_urgent: data.is_urgent ?? false
                }
            });
            await Send_Email(target_user.email, `
            <div>
                <p>Dear User,</p>
                <h1>You have a new Reqeust</h1>
                <p>from ${req_maker.first_name + " " + req_maker.last_name}</p>
                <p>email : ${req_maker.email}</p>
                <p>message from student : ${data.message}</p>
            </div>
        `, "New Request")
            return new_request
        })
    } else {
        // Create new request without target_user
        new_request = await prisma.request.create({
            data: {
                req_maker_id: data.req_maker_id,
                title: data.title,
                message: data.message,
                is_urgent: data.is_urgent ?? false
            }
        });
    }

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
        where: {
            status: Request_Status.PENDING
        },
        orderBy: [
            { is_urgent: 'desc' },
            { created_at: 'desc' },
            { updated_at: 'desc' },
        ]
    });
    return requests;
}

const update_status = async (request_id: string, data: Update_Request_Status_Type) => {
    const request = await prisma.request.findUnique({
        where: { id: request_id }
    })
    if (!request) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, 'Request not found');
    }
    const req_maker = await prisma.person.findUnique({
        where: {
            id: request.req_maker_id
        }
    })
    if (!req_maker) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, 'Request Maker not found');
    }
    let result;

    if (data.status === Request_Status.ACCEPTED && data.target_user_id && data.call_start_at) {
        if (request.target_user_id && request.status === Request_Status.ACCEPTED) {
            throw new Final_App_Error(httpStatus.BAD_REQUEST, "Request already taken by someone ")
        }
        const target_user = await prisma.person.findUnique({
            where: { id: data.target_user_id }
        })
        if (!target_user) {
            throw new Final_App_Error(httpStatus.NOT_FOUND, "Target user not found")
        }
        let call_id = uuidv4();

        await prisma.$transaction(async (tc) => {
            result = await tc.request.update({
                where: {
                    id: request.id,
                    status: Request_Status.PENDING
                },
                data: {
                    status: Request_Status.ACCEPTED,
                    target_user_id: data.target_user_id,
                    call_id: call_id || '',
                    call_start_at: data.call_start_at || '',
                    message: data.message || `Your call start at ${data.call_start_at}`
                }
            })
            // send email
            await Send_Email(req_maker.email, `
            <div>
                <p>Dear User,</p>
                <h1>Request Accepted</h1>
                <p>by ${target_user.first_name + " " + target_user.last_name}</p>
                <p>email : ${target_user.email}</p>
                <p>Your call id : ${call_id}</p>
                <p>Call Start at : ${data.call_start_at}</p>
                <p>message : ${data.message}</p>
            </div>
        `, "Request Accepted")
            return result;
        })

    }
    else if (data.status === Request_Status.ONGOING) {
        result = await prisma.request.update({
            where: {
                id: request.id,
                status: Request_Status.ACCEPTED
            },
            data: {
                status: Request_Status.ONGOING
            }
        })
    }
    else if (data.status === Request_Status.COMPLETED) {
        result = await prisma.request.update({
            where: {
                id: request.id,
                status: Request_Status.ONGOING
            },
            data: {
                status: Request_Status.COMPLETED
            }
        })
    }
    else if (data.status === Request_Status.REJECTED) {
        if (!data.target_user_id) {
            throw new Final_App_Error(httpStatus.BAD_REQUEST, "Target user id is not provided")
        }
        const target_user = await prisma.person.findUnique({
            where: { id: data.target_user_id }
        })
        if (!target_user) {
            throw new Final_App_Error(httpStatus.NOT_FOUND, "Target user not found")
        }
        await prisma.$transaction(async (tc) => {
            result = await tc.request.update({
                where: {
                    id: request.id,
                    status: Request_Status.ACCEPTED
                },
                data: {
                    status: Request_Status.REJECTED,
                    call_id: '',
                    call_start_at: '',
                    message: data.message || "Sorry for this unwanted action"
                }
            })
            await Send_Email(req_maker.email, `
            <div>
                <p>Dear User,</p>
                <h1>Request Rejected</h1>
                <p>by ${target_user.first_name + " " + target_user.last_name}</p>
                <p>email : ${target_user.email}</p>
                <p>message : ${data.message ? data.message : "Sorry for this unwanted action"}</p>
            </div>
        `, "Request Rejected")
        })
    }
    else {
        throw new Final_App_Error(httpStatus.BAD_REQUEST, "Must be provide requred information")
    }


    return result;
}

export const Request_Services = {
    create_request,
    update_request,
    get_requests_as_request_maker,
    get_requests_as_target_user,
    delete_request,
    get_all_requests,
    update_status
}