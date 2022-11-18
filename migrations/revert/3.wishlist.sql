-- Revert cosyworking:3.wishlist from pg

BEGIN;

DROP TABLE IF EXISTS public.wishlist;

COMMIT;