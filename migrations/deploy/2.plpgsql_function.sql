-- Deploy cosyworking:2.plpgsql_function to pg

BEGIN;

CREATE OR REPLACE FUNCTION get_user(parameters INT) RETURNS JSON AS $$
DECLARE result JSON;
DECLARE num INT;
BEGIN
	IF ((SELECT "user".role_id FROM "user" WHERE "user".id = (parameters)) = (SELECT role.id from role where role.description = 'host'))
	THEN
		SELECT row_to_json(row) FROM (
			SELECT "user".id, "user".avatar, "user".first_name, "user".username, "user".about, "user".created_at, workspace.id, workspace.title, image.id, image.link
			FROM "user"
			JOIN workspace ON workspace.user_id = "user".id
			JOIN image ON image.workspace_id = workspace.id
			WHERE "user".id = (parameters) AND image.main_image = true) AS row INTO result;
	ELSE
		SELECT row_to_json(row) FROM (
			SELECT "user".id, "user".avatar, "user".first_name, "user".username, "user".about, "user".created_at
			FROM "user"
			WHERE "user".id = (parameters)) AS row INTO result;
	END IF;
	
	RETURN result;
END;
$$ LANGUAGE PLPGSQL;

COMMIT;
