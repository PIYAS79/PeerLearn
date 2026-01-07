import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

const Route_Not_Found_Error = (req: Request, res: Response,next:NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
    success: false,
    error_title: "Route Not Found",
    error_source: {
      path: req.originalUrl,
      message: "Route Not Found",
    },
  });
}


export default Route_Not_Found_Error;