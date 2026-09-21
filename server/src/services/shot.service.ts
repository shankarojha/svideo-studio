import { supabase } from '../config/supabase.js';
import { AppError } from '../utils/app-error.js';
import type {
    Shot,
    ShotInsert,
    ShotUpdate,
} from '../types/video.types.js';

export const createShot = async (
    data: ShotInsert,
): Promise<Shot> => {
    const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('id')
        .eq('id', data.project_id)
        .maybeSingle();

    if (projectError) {
        throw new AppError(
            `Failed to verify project: ${projectError.message}`,
            500,
        );
    }

    if (!project) {
        throw new AppError('Project not found', 404);
    }

    const { data: existingShot, error: existingShotError } =
        await supabase
            .from('shots')
            .select('id')
            .eq('project_id', data.project_id)
            .eq('shot_number', data.shot_number)
            .maybeSingle();

    if (existingShotError) {
        throw new AppError(
            `Failed to check shot number: ${existingShotError.message}`,
            500,
        );
    }

    if (existingShot) {
        throw new AppError(
            `Shot number ${data.shot_number} already exists in this project`,
            409,
        );
    }

    const { data: shot, error } = await supabase
        .from('shots')
        .insert(data)
        .select()
        .single();

    if (error) {
        throw new AppError(
            `Failed to create shot: ${error.message}`,
            500,
        );
    }

    return shot;
};


export const getShotsByProjectId = async (
    projectId: string,
): Promise<Shot[]> => {
    const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('id')
        .eq('id', projectId)
        .maybeSingle();

    if (projectError) {
        throw new AppError(
            `Failed to verify project: ${projectError.message}`,
            500,
        );
    }

    if (!project) {
        throw new AppError('Project not found', 404);
    }

    const { data: shots, error } = await supabase
        .from('shots')
        .select('*')
        .eq('project_id', projectId)
        .order('shot_number', { ascending: true });

    if (error) {
        throw new AppError(
            `Failed to fetch shots: ${error.message}`,
            500,
        );
    }

    return shots;
};


export const getShotById = async (
    shotId: string,
): Promise<Shot | null> => {
    const { data: shot, error } = await supabase
        .from('shots')
        .select('*')
        .eq('id', shotId)
        .maybeSingle();

    if (error) {
        throw new AppError(
            `Failed to fetch shot: ${error.message}`,
            500,
        );
    }

    return shot;
};


export const updateShot = async (
    shotId: string,
    data: ShotUpdate,
): Promise<Shot> => {
    const { data: existingShot, error: existingShotError } =
        await supabase
            .from('shots')
            .select('*')
            .eq('id', shotId)
            .maybeSingle();

    if (existingShotError) {
        throw new AppError(
            `Failed to fetch shot: ${existingShotError.message}`,
            500,
        );
    }

    if (!existingShot) {
        throw new AppError('Shot not found', 404);
    }

    if (
        data.shot_number !== undefined &&
        data.shot_number !== existingShot.shot_number
    ) {
        const { data: duplicateShot, error: duplicateError } =
            await supabase
                .from('shots')
                .select('id')
                .eq('project_id', existingShot.project_id)
                .eq('shot_number', data.shot_number)
                .neq('id', shotId)
                .maybeSingle();

        if (duplicateError) {
            throw new AppError(
                `Failed to check shot number: ${duplicateError.message}`,
                500,
            );
        }

        if (duplicateShot) {
            throw new AppError(
                `Shot number ${data.shot_number} already exists in this project`,
                409,
            );
        }
    }

    const { data: shot, error } = await supabase
        .from('shots')
        .update(data)
        .eq('id', shotId)
        .select()
        .single();

    if (error) {
        throw new AppError(
            `Failed to update shot: ${error.message}`,
            500,
        );
    }

    return shot;
};


export const deleteShot = async (
    shotId: string,
): Promise<void> => {
    const { data: existingShot, error: existingShotError } =
        await supabase
            .from('shots')
            .select('id')
            .eq('id', shotId)
            .maybeSingle();

    if (existingShotError) {
        throw new AppError(
            `Failed to fetch shot: ${existingShotError.message}`,
            500,
        );
    }

    if (!existingShot) {
        throw new AppError('Shot not found', 404);
    }

    const { error } = await supabase
        .from('shots')
        .delete()
        .eq('id', shotId);

    if (error) {
        throw new AppError(
            `Failed to delete shot: ${error.message}`,
            500,
        );
    }
};