import { supabase } from '../config/supabase.js';
import { AppError } from '../utils/app-error.js';

import type {
    VideoGeneration,
    VideoGenerationInsert,
    VideoGenerationUpdate,
} from '../types/video.types.js';


export const createVideoGeneration = async (
    data: VideoGenerationInsert,
): Promise<VideoGeneration> => {
    const { data: shot, error: shotError } = await supabase
        .from('shots')
        .select('id')
        .eq('id', data.shot_id)
        .maybeSingle();

    if (shotError) {
        throw new AppError(
            `Failed to verify shot: ${shotError.message}`,
            500,
        );
    }

    if (!shot) {
        throw new AppError('Shot not found', 404);
    }

    const generationData: VideoGenerationInsert = {
        ...data,

        status: data.status ?? 'queued',

        queued_at: data.queued_at ?? new Date().toISOString(),
    };

    const { data: generation, error } = await supabase
        .from('video_generations')
        .insert(generationData)
        .select()
        .single();

    if (error) {
        throw new AppError(
            `Failed to create video generation: ${error.message}`,
            500,
        );
    }

    return generation;
};


export const getVideoGenerationsByShotId = async (
    shotId: string,
): Promise<VideoGeneration[]> => {
    const { data: shot, error: shotError } = await supabase
        .from('shots')
        .select('id')
        .eq('id', shotId)
        .maybeSingle();

    if (shotError) {
        throw new AppError(
            `Failed to verify shot: ${shotError.message}`,
            500,
        );
    }

    if (!shot) {
        throw new AppError('Shot not found', 404);
    }

    const { data: generations, error } = await supabase
        .from('video_generations')
        .select('*')
        .eq('shot_id', shotId)
        .order('created_at', { ascending: false });

    if (error) {
        throw new AppError(
            `Failed to fetch video generations: ${error.message}`,
            500,
        );
    }

    return generations;
};


export const getVideoGenerationById = async (
    generationId: string,
): Promise<VideoGeneration | null> => {
    const { data: generation, error } = await supabase
        .from('video_generations')
        .select('*')
        .eq('id', generationId)
        .maybeSingle();

    if (error) {
        throw new AppError(
            `Failed to fetch video generation: ${error.message}`,
            500,
        );
    }

    return generation;
};


export const updateVideoGeneration = async (
    generationId: string,
    data: VideoGenerationUpdate,
): Promise<VideoGeneration> => {
    const { data: existingGeneration, error: existingError } =
        await supabase
            .from('video_generations')
            .select('*')
            .eq('id', generationId)
            .maybeSingle();

    if (existingError) {
        throw new AppError(
            `Failed to fetch video generation: ${existingError.message}`,
            500,
        );
    }

    if (!existingGeneration) {
        throw new AppError('Video generation not found', 404);
    }

    const { data: generation, error } = await supabase
        .from('video_generations')
        .update(data)
        .eq('id', generationId)
        .select()
        .single();

    if (error) {
        throw new AppError(
            `Failed to update video generation: ${error.message}`,
            500,
        );
    }

    return generation;
};