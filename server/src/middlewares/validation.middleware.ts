import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const validate = (
    schema: z.ZodType,
    source: 'body' | 'params' | 'query',
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const validationResult = schema.safeParse(req[source]);

        if (!validationResult.success) {
            res.status(400).json({
                status: 'error',
                message: 'Invalid request data',
                errors: validationResult.error.flatten().fieldErrors,
            });

            return;
        }

        req[source] = validationResult.data;

        next();
    };
};