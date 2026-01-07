import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from "http-status-codes";
import { Academic_Services } from "./academic.services";
import type { JwtPayload } from "jsonwebtoken";


const update_acedimic_info = Async_Catch(async (req: Request & { user?: JwtPayload }, res: Response) => {
    const {id} = req.params;
    const result = await Academic_Services.update_acedimic_info(req.body,id as string);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Academic information updated successfully',
        data: result,
    });
})

export const Academic_Controllers = {
    update_acedimic_info
}