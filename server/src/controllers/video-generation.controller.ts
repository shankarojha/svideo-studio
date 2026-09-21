import type { Request, Response } from 'express';

import {
    createVideoGeneration,
    getVideoGenerationById,
    getVideoGenerationsByShotId,
    updateVideoGeneration,
} from '../services/video-generation.service.js';

import type {
    VideoGenerationInsert,
    VideoGenerationUpdate,
} from '../types/video.types.js';

import { asyncHandler } from '../utils/async-handler.js';


export const createVideoGenerationController = asyncHandler(
    async (
        req: Request,
        res: Response,
    ) => {
        const generation =
            await createVideoGeneration(
                req.body as VideoGenerationInsert,
            );

        res.status(201).json({
            status: 'success',
            data: generation,
        });
    },
);


export const getVideoGenerationsByShotController =
    asyncHandler(
        async (
            req: Request<{ shotId: string }>,
            res: Response,
        ) => {
            const generations =
                await getVideoGenerationsByShotId(
                    req.params.shotId,
                );

            res.status(200).json({
                status: 'success',
                data: generations,
            });
        },
    );


export const getVideoGenerationByIdController =
    asyncHandler(
        async (
            req: Request<{ generationId: string }>,
            res: Response,
        ) => {
            const generation =
                await getVideoGenerationById(
                    req.params.generationId,
                );

            if (!generation) {
                res.status(404).json({
                    status: 'error',
                    message: 'Video generation not found',
                    errors: 'No video generation found with this id',
                });

                return;
            }

            res.status(200).json({
                status: 'success',
                data: generation,
            });
        },
    );


export const updateVideoGenerationController =
    asyncHandler(
        async (
            req: Request<{ generationId: string }>,
            res: Response,
        ) => {
            const generation =
                await updateVideoGeneration(
                    req.params.generationId,
                    req.body as VideoGenerationUpdate,
                );

            res.status(200).json({
                status: 'success',
                data: generation,
            });
        },
    );