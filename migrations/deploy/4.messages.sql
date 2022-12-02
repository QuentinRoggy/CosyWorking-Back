-- Deploy cosyworking:messages to pg

BEGIN;

CREATE TABLE IF NOT EXISTS public.conversation
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    workspace_id integer NOT NULL,
    CONSTRAINT conversation_pkey PRIMARY KEY (id),
    CONSTRAINT workspace_fk FOREIGN KEY (workspace_id)
        REFERENCES public.workspace (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.message
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_id integer NOT NULL,
    conversation_id integer NOT NULL,
    CONSTRAINT message_pkey PRIMARY KEY (id),
    CONSTRAINT conversation_fk FOREIGN KEY (conversation_id)
        REFERENCES public.conversation (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT user_fk FOREIGN KEY (user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

COMMIT;
