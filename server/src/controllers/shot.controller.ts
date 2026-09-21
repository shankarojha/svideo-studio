import type { Request, Response } from 'express';

import {
    createShot,
    deleteShot,
    getShotById,
    getShotsByProjectId,
    updateShot,
} from '../services/shot.service.js';

import type {
    ShotInsert,
    ShotUpdate,
} from '../types/video.types.js';

import { asyncHandler } from '../utils/async-handler.js';


export const createShotController = asyncHandler(
    async (
        req: Request,
        res: Response,
    ) => {
        const shot = await createShot(
            req.body as ShotInsert,
        );

        res.status(201).json({
            status: 'success',
            data: shot,
        });
    },
);


export const getShotsByProjectController = asyncHandler(
    async (
        req: Request<{ projectId: string }>,
        res: Response,
    ) => {
        const shots = await getShotsByProjectId(
            req.params.projectId,
        );

        res.status(200).json({
            status: 'success',
            data: shots,
        });
    },
);


export const getShotByIdController = asyncHandler(
    async (
        req: Request<{ shotId: string }>,
        res: Response,
    ) => {
        const shot = await getShotById(
            req.params.shotId,
        );

        if (!shot) {
            res.status(404).json({
                status: 'error',
                message: 'Shot not found',
                errors: 'No shot found with this id',
            });

            return;
        }

        res.status(200).json({
            status: 'success',
            data: shot,
        });
    },
);


export const updateShotController = asyncHandler(
    async (
        req: Request<{ shotId: string }>,
        res: Response,
    ) => {
        const shot = await updateShot(
            req.params.shotId,
            req.body as ShotUpdate,
        );

        res.status(200).json({
            status: 'success',
            data: shot,
        });
    },
);


export const deleteShotController = asyncHandler(
    async (
        req: Request<{ shotId: string }>,
        res: Response,
    ) => {
        await deleteShot(req.params.shotId);

        res.status(204).send();
    },
);