const workspaceDatamapper = require("../../Datamapper/workspace");
const mapServices = require("../../services/mapServices");

module.exports = {

  async findById(req, res) {
    const workspaceId = req.params.id;

    const workspace = await workspaceDatamapper.findByPk(workspaceId);

    res.json(workspace)

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
  }
}