import type { Request, Response } from 'express';
//PROJECT SERVICE
import { createProject, getProjects, getProjectById } from '../services/project.service.js';
//ZOD VALIDATOR
import { createProjectSchema, projectIdSchema } from '../validators/project.validator.js';
//ASYNC HANDLER
import { asyncHandler } from '../utils/async-handler.js';

export const createProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await createProject(req.body);

    res.status(201).json({
      status: 'success',
      data: project,
    });
  },
);

export const getProjectsController = asyncHandler(
  async (_req: Request, res: Response) => {
    const projects = await getProjects();

    res.status(200).json({
      status: 'success',
      data: projects,
    });
  },
);

export const getProjectByIdController = asyncHandler(
  async (
    req: Request<{ projectId: string }>,
    res: Response,
  ) => {
    const project = await getProjectById(req.params.projectId);

    if (!project) {
      res.status(404).json({
        status: 'error',
        message: 'Invalid project ID',
        errors: "No projects found with this id",
      });

      return;
    }

    res.status(200).json({
      status: 'success',
      data: project,
    });
  },
);