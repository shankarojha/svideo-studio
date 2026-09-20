import type { Request, Response } from 'express';
import { createProject } from '../services/project.service.js';
import { createProjectSchema } from '../validators/project.validator.js';

export const createProjectController = async (
  req: Request,
  res: Response,
) => {
  try {
    const validationResult = createProjectSchema.safeParse(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid request data',
        errors: validationResult.error.flatten().fieldErrors,
      });

      return;
    }

    const project = await createProject(validationResult.data);

    res.status(201).json({
      status: 'success',
      data: project,
    });
  } catch (error) {
    console.error('Create project controller error:', error);

    res.status(500).json({
      status: 'error',
      message: 'Failed to create project',
    });
  }
};