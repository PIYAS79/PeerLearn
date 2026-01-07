import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { Auth_Services } from "./auth.services";
import httpStatus from "http-status-codes";
import type { JwtPayload } from "jsonwebtoken";


const user_login = Async_Catch(async (req: Request, res: Response) => {
    const result = await Auth_Services.user_login(req.body);
    res.cookie('ref_token', result.refresh_token, {
        secure: false,
        httpOnly: true
    })
    res.status(httpStatus.OK).json({
        success: true,
        message: 'User login successfully',
        data: result,
    });
})

const fetch_refresh_token = Async_Catch(async (req: Request, res: Response) => {
    const { ref_token } = req.cookies
    const result = await Auth_Services.fetch_refresh_token(ref_token);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Fetch AT from RT",
        data: result,
    });
})

const change_password = Async_Catch(async (req: Request & { user?: JwtPayload }, res: Response) => {
    const result = await Auth_Services.change_password(req.user, req.body);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully change password",
        data: result,
    });
})

const forget_password = Async_Catch(async (req: Request & { user?: JwtPayload }, res: Response) => {
    const { email } = req.body;
    const result = await Auth_Services.forget_password(email);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Please Check you Email",
        data: result,
    });
})

const reset_password = Async_Catch(async (req: Request & { user?: JwtPayload }, res: Response) => {
    const token = req.headers.authorization as string;
    const result = await Auth_Services.reset_password(token, req.body);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Password Reset Successfully",
        data: result,
    });
})


export const Auth_Controllers = {
    user_login,
    fetch_refresh_token,
    change_password,
    forget_password,
    reset_password

}