const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');


module.exports = {
  async getAll() {
    const result = await client.query(`SELECT equipment.id, equipment.description, equipment.icon_link FROM equipment`);

    return result.rows;
  },

  async associateWorkspaceToEquipment(workspaceId, equipmentsDescription) {

    const queryString = `
    INSERT INTO workspace_has_equipment (equipment_id, workspace_id) 
    VALUES ( (select equipment.id from equipment where description = $1), $2)
    `;

    const result = await client.query(queryString, [equipmentsDescription, workspaceId]);

    return result.rows
  }
};