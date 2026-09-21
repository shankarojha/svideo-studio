-- ============================================================
-- SVideo Studio
-- Migration: Video Pipeline Tracking
-- Migration ID: 202609210001
--
-- Purpose:
--   1. Track the selected video generation for each shot.
--   2. Track ComfyUI execution metadata.
--   3. Store project-level final assembled videos.
--
-- Existing database IDs are UUID.
-- No existing data is deleted.
-- No existing tables are dropped.
-- ============================================================


-- ============================================================
-- 1. ADD SELECTED VIDEO GENERATION TO SHOTS
-- ============================================================

ALTER TABLE public.shots
ADD COLUMN IF NOT EXISTS selected_video_generation_id UUID;


-- ============================================================
-- 2. ADD COMFYUI EXECUTION TRACKING
-- ============================================================

ALTER TABLE public.video_generations
ADD COLUMN IF NOT EXISTS comfyui_job_id TEXT;

ALTER TABLE public.video_generations
ADD COLUMN IF NOT EXISTS queued_at TIMESTAMPTZ;

ALTER TABLE public.video_generations
ADD COLUMN IF NOT EXISTS started_at TIMESTAMPTZ;

ALTER TABLE public.video_generations
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;


-- ============================================================
-- 3. CREATE FINAL VIDEOS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS public.final_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    project_id UUID NOT NULL,

    output_video_path TEXT,

    status TEXT NOT NULL DEFAULT 'pending',

    duration_ms BIGINT,

    generation_time_ms BIGINT,

    error_message TEXT,

    render_settings JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT final_videos_project_id_fkey
        FOREIGN KEY (project_id)
        REFERENCES public.projects(id)
        ON DELETE CASCADE
);


-- ============================================================
-- 4. SELECTED VIDEO GENERATION FOREIGN KEY
-- ============================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'shots_selected_video_generation_id_fkey'
    ) THEN

        ALTER TABLE public.shots
        ADD CONSTRAINT shots_selected_video_generation_id_fkey
        FOREIGN KEY (selected_video_generation_id)
        REFERENCES public.video_generations(id)
        ON DELETE SET NULL;

    END IF;
END
$$;


-- ============================================================
-- 5. INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS
    shots_selected_video_generation_id_idx
ON public.shots (selected_video_generation_id);


CREATE UNIQUE INDEX IF NOT EXISTS
    video_generations_comfyui_job_id_unique_idx
ON public.video_generations (comfyui_job_id)
WHERE comfyui_job_id IS NOT NULL;


CREATE INDEX IF NOT EXISTS
    final_videos_project_id_idx
ON public.final_videos (project_id);


CREATE INDEX IF NOT EXISTS
    final_videos_status_idx
ON public.final_videos (status);


CREATE INDEX IF NOT EXISTS
    final_videos_created_at_idx
ON public.final_videos (created_at DESC);


-- ============================================================
-- 6. UPDATED_AT FUNCTION
-- ============================================================

CREATE OR REPLACE FUNCTION public.set_final_videos_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


-- ============================================================
-- 7. UPDATED_AT TRIGGER
-- ============================================================

DROP TRIGGER IF EXISTS
    set_final_videos_updated_at
ON public.final_videos;


CREATE TRIGGER
    set_final_videos_updated_at
BEFORE UPDATE ON public.final_videos
FOR EACH ROW
EXECUTE FUNCTION public.set_final_videos_updated_at();


-- ============================================================
-- 8. COMMENTS
-- ============================================================

COMMENT ON COLUMN public.shots.selected_video_generation_id IS
    'The video generation currently selected as the active generation for this shot.';


COMMENT ON COLUMN public.video_generations.comfyui_job_id IS
    'Identifier used to correlate this generation with a ComfyUI execution.';


COMMENT ON COLUMN public.video_generations.queued_at IS
    'Timestamp when the generation was submitted to the ComfyUI pipeline.';


COMMENT ON COLUMN public.video_generations.started_at IS
    'Timestamp when ComfyUI processing started.';


COMMENT ON COLUMN public.video_generations.completed_at IS
    'Timestamp when ComfyUI processing completed or failed.';


COMMENT ON TABLE public.final_videos IS
    'Project-level assembled video outputs. Multiple versions can exist for a project.';


COMMENT ON COLUMN public.final_videos.output_video_path IS
    'Storage path of the assembled final video.';


COMMENT ON COLUMN public.final_videos.render_settings IS
    'JSON configuration used when assembling the final project video.';