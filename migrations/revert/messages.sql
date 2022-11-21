-- Revert cosyworking:messages from pg

BEGIN;

DROP TABLE IF EXISTS public.message;
DROP TABLE IF EXISTS public.conversation;

COMMIT;
