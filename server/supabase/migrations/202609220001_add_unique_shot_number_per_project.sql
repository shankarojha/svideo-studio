-- ============================================================
-- SVideo Studio
-- Migration: Unique Shot Number Per Project
-- Migration ID: 202609220001
--
-- Purpose:
--   Ensure that every shot number is unique within a project.
--
-- Existing duplicate check:
--   Passed — no duplicate (project_id, shot_number) values exist.
--
-- No existing data is modified or deleted.
-- ============================================================


ALTER TABLE public.shots
ADD CONSTRAINT shots_project_id_shot_number_unique
UNIQUE (project_id, shot_number);


-- ============================================================
-- Documentation
-- ============================================================

COMMENT ON CONSTRAINT shots_project_id_shot_number_unique
ON public.shots IS
    'Ensures that shot numbers are unique within each project.';