-- Revert cosyworking:reviews from pg

BEGIN;

DROP TABLE IF EXISTS public.user_review;
DROP TABLE IF EXISTS public.workspace_review;
COMMIT;
