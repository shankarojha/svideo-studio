import { z } from 'zod';

export const createProjectSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Project name is required')
        .max(100, 'Project name must be 100 characters or less'),

    description: z
        .string()
        .trim()
        .max(500, 'Project description must be 500 characters or less')
        .optional(),
});

export const projectIdSchema = z.object({
    projectId: z.string().uuid('Invalid project ID'),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export type ProjectIdParams = z.infer<typeof projectIdSchema>;