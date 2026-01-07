import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import Final_App_Error from "./Final_App_Error.js";

type Error_Source_Type = {
  path: string | number;
  message: string;
}[];

const Global_Error_Handler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let Error_Title = err.message || "This is a server side error";
  let Error_Source: Error_Source_Type = [
    {
      path: "",
      message: err.message || "This is a server side error",
    },
  ];
  let status_code = err.status_code || httpStatus.INTERNAL_SERVER_ERROR;

  if (err instanceof Error) {
    Error_Title = err.message,
      Error_Source = [
        {
          path: "",
          message: err.message,
        },
      ];
  } else if (err instanceof Final_App_Error) {
    Error_Title = err.message,
      Error_Source = [
        {
          path: "",
          message: err.message,
        },
      ];
    status_code = err.status_code;
  }else if (err.code ==="P2002"){
    console.log("PIyas");
    Error_Title = err.meta.driverAdapterError.cause.originalMessage || "duplicate key error",
      Error_Source = [
        {
          path: "",
          message: err.message,
        },
      ];
    status_code = err.status_code;
  }

  res.status(status_code).json({
    success: false,
    error_title: Error_Title,
    // error_source: Error_Source,
    // stack: err.stack,
    error: err,
  });
};

export default Global_Error_Handler;