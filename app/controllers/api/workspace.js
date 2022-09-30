const workspaceDatamapper = require("../../Datamapper/workspace");
const mapServices = require("../../services/mapServices");

module.exports = {

  async findById(req, res) {
    const workspaceId = req.params.id;

    const workspace = await workspaceDatamapper.getWorkspaceByPk(workspaceId);

    res.json(workspace);

  },

  async findWorkspacesByHost(req, res) {
    const hostId = req.params.hostid;

    const workspaces = await workspaceDatamapper.getWorkspacesByHostId(hostId);

    res.json(workspaces);
  },

  async create(req, res) {
    const workspaceToCreate = req.body;
    
    const coordinates = await mapServices.findLocation(req.body.address,req.body.zip_code, req.body.city);

    workspaceToCreate.latitude = coordinates.latitude;
    workspaceToCreate.longitude = coordinates.longitude;

    const workspaceInstance = await workspaceDatamapper.create(workspaceToCreate);

    res.json(workspaceInstance);
  },

  async findRandom(_, res) {
    const workspaces = await workspaceDatamapper.getRandom();
    res.json(workspaces);
  },

  async updateState(req, res) {
    const workspaceId = req.params.id;
    const newState = req.body.availability;

    const result = await workspaceDatamapper.patchState(workspaceId, newState);

    res.json({message: `The workspace availabilty was succussfully changed to ${req.body.availability}`});
  }
}