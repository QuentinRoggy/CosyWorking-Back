SELECT DISTINCT workspace.id, workspace.title, workspace.description, workspace.address, workspace.zip_code, workspace.city, workspace.latitude, 
  workspace.longitude, workspace.day_price, workspace.half_day_price, 
  (SELECT ARRAY_AGG(image.link) FROM image WHERE image.workspace_id = 2) as image_links,
  "user".first_name as host, "user".avatar as host_avatar,
  ( )
  FROM workspace
  JOIN "user" ON "user".id = workspace.user_id
  JOIN image ON image.workspace_id = workspace.id
  WHERE workspace.id = 2
  
  
  SELECT json_build_object(
	'workspace',workspace.*,
	'images', (SELECT json_agg(json_build_object('link', image.link, 'main',image.main_image))
			   FROM image 
			   JOIN workspace ON workspace.id = image.workspace_id
			   where workspace.id = 2
				),
	  'booking_list', (SELECT json_agg(json_build_object('start_date', booking.start_date, 
														 'end_date',booking.end_date))
			   FROM booking 
			   JOIN workspace ON workspace.id = booking.workspace_id
			   where workspace.id = 2
				)
)
FROM workspace
WHERE workspace.id = 2;

EXPLAIN SELECT workspace.id, workspace.title, workspace.address, workspace.zip_code, workspace.city,
workspace.half_day_price, workspace.day_price, workspace.availability,
(SELECT ARRAY_AGG(image.link) AS images
	FROM user
	JOIN image ON image.workspace_id = workspace.id)
from workspace
WHERE workspace.user_id = 2;



SELECT json_build_object(
	'workspace',workspace.*,
	'images', (SELECT json_agg(json_build_object('link', image.link, 'main',image.main_image))
			   FROM user 
			   INNER JOIN image ON image.workspace_id = workspace.id
)
)
FROM workspace
WHERE workspace.user_id = 2;