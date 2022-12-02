-- Deploy cosyworking:reviews to pg

BEGIN;

CREATE TABLE IF NOT EXISTS public.user_review
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    note integer NOT NULL,
    message text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_review_pkey PRIMARY KEY (id),
    CONSTRAINT receiver_fk FOREIGN KEY (receiver_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT sender_fk FOREIGN KEY (sender_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.workspace_review
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    workspace_id integer NOT NULL,
    sender_id integer NOT NULL,
    note integer NOT NULL,
    message text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT workspace_reviex_pk PRIMARY KEY (id),
    CONSTRAINT user_fk FOREIGN KEY (sender_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT workspace_fk FOREIGN KEY (workspace_id)
        REFERENCES public.workspace (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);


COMMIT;
