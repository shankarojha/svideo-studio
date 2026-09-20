import { supabase } from "../config/supabase.js";

interface CreateProjectInput {
  name: string;
  description?: string | undefined;
}

export const createProject = async ({
  name,
  description,
}: CreateProjectInput) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .insert({
        name,
        description,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error creating project:", error);

    throw new Error("Failed to create project");
  }
};
