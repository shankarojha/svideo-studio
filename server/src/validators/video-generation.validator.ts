import { z } from 'zod';

const uuidSchema = z.uuid('Invalid UUID');

const generationStatusSchema = z.enum([
    'queued',
    'running',
    'completed',
    'failed',
    'cancelled',
]);

export const createVideoGenerationSchema = z.object({
    shot_id: uuidSchema,

    prompt: z
        .string()
        .trim()
        .min(1, 'Prompt is required'),

    negative_prompt: z
        .string()
        .trim()
        .nullable()
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

    model_name: z
        .string()
        .trim()
        .min(1, 'Model name cannot be empty')
        .nullable()
        .optional(),

    seed: z
        .number()
        .int('Seed must be an integer')
        .nullable()
        .optional(),

    workflow_path: z
        .string()
        .trim()
        .min(1, 'Workflow path cannot be empty')
        .nullable()
        .optional(),

    status: generationStatusSchema.optional(),
});

export const shotIdSchema = z.object({
    shotId: uuidSchema,
});

export const generationIdSchema = z.object({
    generationId: uuidSchema,
});

export const updateVideoGenerationSchema = z
    .object({
        comfyui_job_id: z
            .string()
            .trim()
            .min(1, 'ComfyUI job ID cannot be empty')
            .nullable()
            .optional(),

        status: generationStatusSchema.optional(),

        output_video_path: z
            .string()
            .trim()
            .min(1, 'Output video path cannot be empty')
            .nullable()
            .optional(),

        last_frame_path: z
            .string()
            .trim()
            .min(1, 'Last frame path cannot be empty')
            .nullable()
            .optional(),

        queued_at: z
            .string()
            .datetime({ offset: true })
            .nullable()
            .optional(),

        started_at: z
            .string()
            .datetime({ offset: true })
            .nullable()
            .optional(),

        completed_at: z
            .string()
            .datetime({ offset: true })
            .nullable()
            .optional(),

        generation_time_ms: z
            .number()
            .int()
            .nonnegative()
            .nullable()
            .optional(),

        error_message: z
            .string()
            .trim()
            .nullable()
            .optional(),
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: 'At least one field is required',
        },
    );