const workspaceDatamapper = require("../../Datamapper/workspace");
const mapServices = require("../../services/mapServices");

module.exports = {

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