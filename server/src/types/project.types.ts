import type { Database } from './database.types.js';

type Tables = Database['public']['Tables'];

export type Project = Tables['projects']['Row'];

export type ProjectInsert = Tables['projects']['Insert'];

export type ProjectUpdate = Tables['projects']['Update'];