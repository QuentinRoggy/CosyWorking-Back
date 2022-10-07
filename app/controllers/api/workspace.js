const workspaceDatamapper = require("../../Datamapper/workspace");
const equipmentDatamapper = require("../../Datamapper/equipment");
const mapServices = require("../../services/mapServices");

module.exports = {

  async findById(req, res) {
    const workspaceId = req.params.id;

    const workspace = await workspaceDatamapper.getWorkspaceByPk(workspaceId);

    res.json(workspace);

  },

  async findWorkspacesByHost(req, res) {

    if (req.userId !== parseInt(req.params.hostid) ) {
      return res.json({message : "nope"});
    }

    const hostId = req.params.hostid;

    const workspaces = await workspaceDatamapper.getWorkspacesByHostId(hostId);

    res.json(workspaces);
  },

  async create(req, res) {
    const workspaceToCreate = req.body;
    
    const coordinates = await mapServices.findLocation(req.body.address,req.body.zip_code, req.body.city);

    workspaceToCreate.latitude = coordinates.latitude;
    workspaceToCreate.longitude = coordinates.longitude;

    const { equipment_list } = workspaceToCreate;
    let equipmentsDescription = '';

    delete workspaceToCreate.equipment_list;

    const workspaceInstance = await workspaceDatamapper.create(workspaceToCreate);

    const workspaceId = workspaceInstance[0].id;


    for (const equipments of equipment_list) {
      equipmentsDescription = equipments.description;

      await equipmentDatamapper.associateWorkspaceToEquipment(workspaceId, equipmentsDescription);
  }


    res.json(workspaceInstance);
  },

  async findRandom(_, res) {
    const workspaces = await workspaceDatamapper.getRandom();
    res.json(workspaces);
  },

  async updateOne(req, res) {
    const workspaceId = req.params.id;
    const updatedWorkspace = req.body;

    const result = await workspaceDatamapper.patchOne(workspaceId, updatedWorkspace);

    res.json(result);
  },

  async updateState(req, res) {
    const workspaceId = req.params.id;
    const newState = req.body.availability;

    await workspaceDatamapper.patchState(workspaceId, newState);

    res.json({message: `The workspace availabilty was succussfully changed to ${req.body.availability}`});
  },

  async searchWorkspaces(req, res) {
    const searchDetails = req.body;

    const workspacesAvailable = await workspaceDatamapper.getWorkspacesFromSearch(searchDetails);

    res.json(workspacesAvailable);
  }
}