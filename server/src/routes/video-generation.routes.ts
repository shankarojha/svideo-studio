import { Router } from 'express';

import {
    createVideoGenerationController,
    getVideoGenerationByIdController,
    getVideoGenerationsByShotController,
    updateVideoGenerationController,
} from '../controllers/video-generation.controller.js';

import { validate } from '../middlewares/validation.middleware.js';

import {
    createVideoGenerationSchema,
    generationIdSchema,
    shotIdSchema,
    updateVideoGenerationSchema,
} from '../validators/video-generation.validator.js';


const router = Router();


router.post(
    '/',
    validate(createVideoGenerationSchema, 'body'),
    createVideoGenerationController,
);


router.get(
    '/shot/:shotId',
    validate(shotIdSchema, 'params'),
    getVideoGenerationsByShotController,
);


router.get(
    '/:generationId',
    validate(generationIdSchema, 'params'),
    getVideoGenerationByIdController,
);


router.patch(
    '/:generationId',
    validate(generationIdSchema, 'params'),
    validate(updateVideoGenerationSchema, 'body'),
    updateVideoGenerationController,
);


export default router;