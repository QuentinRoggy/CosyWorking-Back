const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');


module.exports = {
  async getAll() {
    const result = await client.query(`SELECT equipment.id, equipment.description, equipment.icon_link FROM equipment`);

    return result.rows;
  },

  async associateWorkspaceToEquipment(workspaceId, equipmentList) {

    const queryEquipment = [];
    const values = [];
    let counter = 2;

    for(const key of equipmentList){
      queryEquipment.push(`((select equipment.id from equipment where description = $${counter}), $1)`);
      values.push(key.description);
      counter++;
    }


    const queryString = `
    INSERT INTO workspace_has_equipment (equipment_id, workspace_id) 
    VALUES ${queryEquipment.join(',')};
    `;

    const result = await client.query(queryString, [workspaceId, ...values]);

    return result.rows;
  }
};