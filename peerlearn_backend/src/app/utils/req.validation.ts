import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';


const Validation_Request = (schema: z.ZodTypeAny) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body,
        })
        return next();
    } catch (err: any) {
        next(err);
    }
}

export default Validation_Request;