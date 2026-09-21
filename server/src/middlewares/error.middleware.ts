import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error.js';

export const errorMiddleware = (
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    console.error('Error:', error);

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });

        return;
    }

    res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
};