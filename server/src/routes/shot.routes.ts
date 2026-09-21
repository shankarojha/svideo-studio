import { Router } from 'express';

import {
    createShotController,
    deleteShotController,
    getShotByIdController,
    getShotsByProjectController,
    updateShotController,
} from '../controllers/shot.controller.js';

import { validate } from '../middlewares/validation.middleware.js';

import {
    createShotSchema,
    projectIdSchema,
    shotIdSchema,
    updateShotSchema,
} from '../validators/shot.validator.js';


const router = Router();


router.post(
    '/',
    validate(createShotSchema, 'body'),
    createShotController,
);


router.get(
    '/project/:projectId',
    validate(projectIdSchema, 'params'),
    getShotsByProjectController,
);


router.get(
    '/:shotId',
    validate(shotIdSchema, 'params'),
    getShotByIdController,
);


router.patch(
    '/:shotId',
    validate(shotIdSchema, 'params'),
    validate(updateShotSchema, 'body'),
    updateShotController,
);


router.delete(
    '/:shotId',
    validate(shotIdSchema, 'params'),
    deleteShotController,
);


export default router;