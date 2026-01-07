import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { User_Services } from "./user.services";
import type { JwtPayload } from "jsonwebtoken";


const create_person = Async_Catch(async (req: Request, res: Response) => {
    const result = await User_Services.create_person(req.body);
    res.status(200).json({
        status: 'success',
        message: 'Person created successfully',
        data: result,
    });
})

const create_admin = Async_Catch(async (req: Request, res: Response) => {
    const result = await User_Services.create_admin(req.body);
    res.status(200).json({
        status: 'success',
        message: 'Admin created successfully',
        data: result,
    });
})

const delete_person_and_user = Async_Catch(async (req: Request & { user?: JwtPayload }, res: Response) => {
    const { id } = req.params;
    const result = await User_Services.delete_person_and_user(id as string, req.user as JwtPayload);
    res.status(200).json({
        status: 'success',
        message: 'Person and User deleted successfully',
        data:result
    });
});


export const User_Controller = {
    create_person,
    create_admin,
    delete_person_and_user
}