const client = require("../config/db");

module.exports = {

  async getWorkspaceByPk(workspaceId) {
  const queryString = `
  SELECT json_build_object(
    'workspace',workspace.*,
      'user', (SELECT json_agg(json_build_object('host_id', "user".id, 'host', "user".first_name, 
                          'host_avatar',"user".avatar))
           FROM "user" 
           JOIN workspace ON workspace.user_id = "user".id
           where workspace.id = $1
          ),
    'images', (SELECT json_agg(json_build_object('image_id', image.id, 'link', image.link, 'main',image.main_image))
           FROM image 
           JOIN workspace ON workspace.id = image.workspace_id
           where workspace.id = $1
          ),
      'booking_list', (SELECT json_agg(json_build_object('booking_id', booking.id, 'start_date', booking.start_date, 
                               'end_date',booking.end_date))
           FROM booking 
           JOIN workspace ON workspace.id = booking.workspace_id
			JOIN state ON state.id = booking.state_id
           where workspace.id = $1 AND state.description = 'En attente' OR state.description = 'Validé'
          ),
      'equipments_list', (SELECT json_agg(json_build_object('quipment_id', equipment.id, 'description', equipment.description, 
                               'icon_link', equipment.icon_link))
           FROM workspace_has_equipment 
           JOIN equipment ON equipment.id = workspace_has_equipment.equipment_id
           where workspace_has_equipment.workspace_id = $1
          )
  ) as workspace_details
  FROM workspace
  WHERE workspace.id = $1;
  `;
  const result = await client.query(queryString, [workspaceId]);

  return result.rows;
  },

  async getWorkspacesByHostId(hostId) {
    const queryString = `SELECT json_build_object(
      'workspace',workspace.*,
      'images', (SELECT json_agg(json_build_object('link', image.link, 'main',image.main_image))
             FROM user 
             INNER JOIN image ON image.workspace_id = workspace.id
    )
    )
    FROM workspace
    WHERE workspace.user_id = $1;`;

    const result = await client.query(queryString, [hostId]);

    return result.rows;
  },

  async create(workspaceToInsert) {
    const queryString = `INSERT INTO "workspace" (title, description, address, zip_code, city, day_price, half_day_price, user_id, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
    
    const values = [];

    for (const key in workspaceToInsert) {
      values.push(workspaceToInsert[key]);
    };

    const result = await client.query(queryString, [...values]);
    
    return result.rows;
  },

  async getRandom(){
    
    const queryString = `
    SELECT workspace.title, workspace.day_price, workspace.city, image.link as image_link
    FROM workspace
    JOIN image ON image.workspace_id = workspace.id
    WHERE image.main_image = true
    ORDER BY RANDOM() LIMIT 5;
    `;
    
    const result = await client.query(queryString);
    return result.rows;
  },

  async patchOne(workspaceId, updatedWorkspace) {

    let queryObject = {};

    let queryString = "";
    let counter = 1;
    let queryParams = [];
    let values = [];
    let columns = [];

    for (const key in updatedWorkspace ) {
      columns.push(key);
      queryParams.push(`$${counter}`);
      counter ++;

      values.push(updatedWorkspace[key]);
    }

    if (queryParams.length > 1 ) {
      queryString = `UPDATE workspace SET ( ${columns.join(',')} ) = (${queryParams.join(',')}) WHERE id = ${workspaceId} RETURNING *;`;

    } else {
      queryString = `UPDATE workspace SET ${columns.join(',')} = ${queryParams.join(',')} WHERE id = ${workspaceId} RETURNING *;`;
    }

    queryObject.queryString = queryString;
    queryObject.values = values;

    const result = await client.query(queryObject.queryString, [...queryObject.values]);

    return result.rows;

  },

  async patchState(workspaceId, newState) {
    const queryString = `UPDATE workspace SET availability = $2 WHERE workspace.id = $1`;

    await client.query(queryString, [workspaceId, newState]);

    return;
  },

  async getWorkspacesFromSearch(searchDetails) {
    const { city, date_list, equipments } = searchDetails;

    let counter = 1;
    let values = [];
    let startDate = [];
    let endDate = [];
    let equipmentsList = [];
    let startDateString = `(`;
    let endDateString = `(`;
    let equipmentString = '';

    values.push(city);

    for (const date of date_list) {
      startDate.push(date.start_date);
      endDate.push(date.end_date);
    }

    for (const equipment of equipments) {
      equipmentsList.push(equipment.description);
    }

    for (const date of startDate) {
      values.push(date);
      counter++;
      startDateString += `$${counter},`;
    }
    startDateString = startDateString.slice(0, -1);
    startDateString += ')';


    for (const date of endDate) {
      values.push(date);
      counter++;
      endDateString += `$${counter},`;
    }
    endDateString = endDateString.slice(0, -1);
    endDateString += ')';

    if (equipmentsList.length > 1) {
      equipmentString = `SELECT workspace_has_equipment.workspace_id
      FROM workspace_has_equipment
      WHERE workspace_has_equipment.equipment_id = (SELECT equipment.id FROM equipment WHERE equipment.description = `;
      let index = 0;
      for (const equipment of equipmentsList ) {
        index ++;
        values.push(equipment);
        counter++;
        if (index === equipmentsList.length) {
          equipmentString += `$${counter})`;
        } else {
          equipmentString += `$${counter}) INTERSECT
          SELECT workspace_has_equipment.workspace_id
          FROM workspace_has_equipment
          WHERE workspace_has_equipment.equipment_id = (SELECT equipment.id FROM equipment WHERE equipment.description = `
        }
      }
    } else {
      values.push(equipmentsList[0])
      counter++;
      equipmentString = `SELECT workspace_has_equipment.workspace_id
      FROM workspace_has_equipment
      WHERE workspace_has_equipment.equipment_id = (SELECT equipment.id FROM equipment WHERE equipment.description = $${counter})`;
    }

    const queryString = `SELECT DISTINCT workspace.id, workspace.title, workspace.description, workspace.day_price, workspace.latitude, workspace.longitude, image.link
    FROM workspace 
    JOIN image ON image.workspace_id = workspace.id
    WHERE 
    image.main_image = true
    AND (workspace.id NOT IN (
      SELECT DISTINCT booking.workspace_id 
      FROM booking 
      WHERE booking.start_date IN ${startDateString}
      AND booking.end_date IN ${endDateString})    
      AND workspace.city = $1
      AND workspace.id IN (SELECT * FROM (
     ${equipmentString}
      ) as workspace_by_equipment))
    OR (workspace.id NOT IN (Select DISTINCT booking.workspace_id FROM booking) 
      AND workspace.city = $1 
      AND workspace.id IN (SELECT * FROM (
        ${equipmentString}
      ) as workspace_by_equipment))`;

    const result = await client.query(queryString, [...values]);

    return result.rows;
  }

}