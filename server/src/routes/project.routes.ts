import { Router } from 'express';
import { createProjectController, getProjectsController, getProjectByIdController } from '../controllers/project.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { createProjectSchema, projectIdSchema } from '../validators/project.validator.js';

const router = Router();

router.post('/', validate(createProjectSchema, 'body'), createProjectController);
router.get('/', getProjectsController)
router.get('/:projectId', validate(projectIdSchema, 'params'), getProjectByIdController);

export default router;