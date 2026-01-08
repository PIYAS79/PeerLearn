import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from 'http-status-codes';
import { Request_Services } from "./request.services";



const create_request = Async_Catch(async (req: Request, res: Response) => {
    const result = await Request_Services.create_request(req.body);
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Request created successfully',
        data: result,
    });
})

const update_request = Async_Catch(async (req: Request, res: Response) => {
    const result = await Request_Services.update_request(req.params.id as string, req.body);
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Request updated successfully',
        data: result,
    });
})

const get_requests_as_request_maker = Async_Catch(async (req: Request, res: Response) => {
    const result = await Request_Services.get_requests_as_request_maker(req.params.id as string);
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Get all Requests successfully',
        data: result,
    });
})

const get_requests_as_target_user = Async_Catch(async (req: Request, res: Response) => {
    const result = await Request_Services.get_requests_as_target_user(req.params.id as string);
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Get all Requests successfully',
        data: result,
    });
})

const delete_request = Async_Catch(async (req: Request, res: Response) => {
    const result = await Request_Services.delete_request(req.params.id as string);
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Request deleted successfully',
        data: result,
    });
})

const get_all_requests = Async_Catch(async (req: Request, res: Response) => {
    const result = await Request_Services.get_all_requests();
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Get all Requests successfully',
        data: result,
    });
})



export const Request_Controllers = {
    create_request,
    update_request,
    get_requests_as_request_maker,
    get_requests_as_target_user,
    delete_request,
    get_all_requests
}