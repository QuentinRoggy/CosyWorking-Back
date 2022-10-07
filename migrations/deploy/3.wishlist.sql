-- Deploy cosyworking:3.wishlist to pg

BEGIN;

CREATE TABLE IF NOT EXISTS public.wishlist
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    workspace_id integer NOT NULL,
    user_id integer NOT NULL,
    CONSTRAINT wishlist_pkey PRIMARY KEY (id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT workspace_id FOREIGN KEY (workspace_id)
        REFERENCES public.workspace (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

COMMIT;
