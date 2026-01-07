import type { NextFunction, Request, Response } from "express";
import Final_App_Error from "../errors/Final_App_Error.js";
import httpStatus from 'http-status-codes';
import type { JwtPayload } from "jsonwebtoken";
import { JWT_Helper } from "../global/jwt_helpers.js";
import config from "../../config/index.js";



const Check_Roles = (...roles: string[]) => {
    return async (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new Final_App_Error(httpStatus.UNAUTHORIZED, "you are not authorized")
            }
            const verified_user = JWT_Helper.verify_token(token, config.jwt.access_token_secret as string)
            req.user = verified_user;
            if (roles.length && !roles.includes(verified_user.role)) {
                throw new Final_App_Error(httpStatus.FORBIDDEN, "forbidden request")
            }
            next()
        } catch (err: any) {
            next(err);
        }
    }
}


export default Check_Roles;