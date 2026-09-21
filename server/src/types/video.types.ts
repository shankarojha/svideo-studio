import type { Database } from './database.types.js';

type Tables = Database['public']['Tables'];


// ============================================================
// Project
// ============================================================

export type Project = Tables['projects']['Row'];

export type ProjectInsert = Tables['projects']['Insert'];

export type ProjectUpdate = Tables['projects']['Update'];


// ============================================================
// Reference Assets
// ============================================================

export type ReferenceAsset = Tables['reference_assets']['Row'];

export type ReferenceAssetInsert =
    Tables['reference_assets']['Insert'];

export type ReferenceAssetUpdate =
    Tables['reference_assets']['Update'];


// ============================================================
// Shot
// ============================================================

export type Shot = Tables['shots']['Row'];

export type ShotInsert = Tables['shots']['Insert'];

export type ShotUpdate = Tables['shots']['Update'];


// ============================================================
// Shot Reference Assets
// ============================================================

export type ShotReferenceAsset =
    Tables['shot_reference_assets']['Row'];

export type ShotReferenceAssetInsert =
    Tables['shot_reference_assets']['Insert'];

export type ShotReferenceAssetUpdate =
    Tables['shot_reference_assets']['Update'];


// ============================================================
// Video Generation
// ============================================================

export type VideoGeneration =
    Tables['video_generations']['Row'];

export type VideoGenerationInsert =
    Tables['video_generations']['Insert'];

export type VideoGenerationUpdate =
    Tables['video_generations']['Update'];


// ============================================================
// Voice Generation
// ============================================================

export type VoiceGeneration =
    Tables['voice_generations']['Row'];

export type VoiceGenerationInsert =
    Tables['voice_generations']['Insert'];

export type VoiceGenerationUpdate =
    Tables['voice_generations']['Update'];


// ============================================================
// SFX Generation
// ============================================================

export type SfxGeneration =
    Tables['sfx_generations']['Row'];

export type SfxGenerationInsert =
    Tables['sfx_generations']['Insert'];

export type SfxGenerationUpdate =
    Tables['sfx_generations']['Update'];


// ============================================================
// Final Video
// ============================================================

export type FinalVideo =
    Tables['final_videos']['Row'];

export type FinalVideoInsert =
    Tables['final_videos']['Insert'];

export type FinalVideoUpdate =
    Tables['final_videos']['Update'];