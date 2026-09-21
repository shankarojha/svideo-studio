import { supabase } from "../config/supabase.js";
import { AppError } from '../utils/app-error.js';
import type {
  Project,
  ProjectInsert,
} from '../types/project.types.js';
import type {
  CreateProjectInput,
} from '../validators/project.validator.js';

export const createProject = async (
  input: ProjectInsert,
): Promise<Project> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert(input)
      .select()
      .single();

    if (error) {
      console.error('Supabase create project error:', error);

      throw new AppError(
        'Failed to create project',
        500,
      );
    }

    return data;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error('Unexpected create project error:', error);

    throw new AppError(
      'Failed to create project',
      500,
    );
  }
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase get projects error:', error);

      throw new AppError(
        'Failed to fetch projects',
        500,
      );
    }

    return data;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error('Unexpected get projects error:', error);

    throw new AppError(
      'Failed to fetch projects',
      500,
    );
  }
};

export const getProjectById = async (
  projectId: string,
): Promise<Project> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .maybeSingle();

    if (error) {
      console.error('Supabase get project error:', error);

      throw new AppError(
        'Failed to fetch project',
        500,
      );
    }

    if (!data) {
      throw new AppError(
        'Project not found',
        404,
      );
    }

    return data;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error('Unexpected get project error:', error);

    throw new AppError(
      'Failed to fetch project',
      500,
    );
  }
};