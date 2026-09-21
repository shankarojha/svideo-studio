import { z } from 'zod';

const uuidSchema = z.uuid('Invalid UUID');

export const createShotSchema = z.object({
    project_id: uuidSchema,

    shot_number: z
        .number()
        .int('Shot number must be an integer')
        .positive('Shot number must be greater than 0'),

    video_prompt: z
        .string()
        .trim()
        .min(1, 'Video prompt is required'),

    negative_prompt: z
        .string()
        .trim()
        .nullable()
        .optional(),

    duration_seconds: z
        .number()
        .positive('Duration must be greater than 0')
        .optional(),

    input_image_path: z
        .string()
        .trim()
        .min(1, 'Input image path cannot be empty')
        .nullable()
        .optional(),

    last_frame_path: z
        .string()
        .trim()
        .min(1, 'Last frame path cannot be empty')
        .nullable()
        .optional(),

    status: z
        .string()
        .trim()
        .min(1, 'Status cannot be empty')
        .optional(),
});

export const projectIdSchema = z.object({
    projectId: uuidSchema,
});

export const shotIdSchema = z.object({
    shotId: uuidSchema,
});

export const updateShotSchema = z
    .object({
        shot_number: z
            .number()
            .int('Shot number must be an integer')
            .positive('Shot number must be greater than 0')
            .optional(),

        video_prompt: z
            .string()
            .trim()
            .min(1, 'Video prompt is required')
            .optional(),

        negative_prompt: z
            .string()
            .trim()
            .nullable()
            .optional(),

        duration_seconds: z
            .number()
            .positive('Duration must be greater than 0')
            .optional(),

        input_image_path: z
            .string()
            .trim()
            .min(1, 'Input image path cannot be empty')
            .nullable()
            .optional(),

        last_frame_path: z
            .string()
            .trim()
            .min(1, 'Last frame path cannot be empty')
            .nullable()
            .optional(),

        status: z
            .string()
            .trim()
            .min(1, 'Status cannot be empty')
            .optional(),
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: 'At least one field is required',
        },
    );