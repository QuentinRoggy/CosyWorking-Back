const workspaceDatamapper = require("../../Datamapper/workspace");
const equipmentDatamapper = require("../../Datamapper/equipment");
const imageDatamapper = require("../../Datamapper/image");
const securityDatamapper = require('../../Datamapper/security');
const reviewsDatamapper = require('../../Datamapper/reviews');


const mapServices = require("../../services/mapServices");
const { stringify } = require("querystring");

module.exports = {

  async findById(req, res) {
    const workspaceId = req.params.id;

    const workspace = await workspaceDatamapper.getWorkspaceByPk(workspaceId);

    workspace[0].workspace_details.workspace.city = workspace[0].workspace_details.workspace.city.charAt(0).toUpperCase() + workspace[0].workspace_details.workspace.city.slice(1);

    res.json(workspace);

  },

  async findWorkspacesByHost(req, res) {

    if (req.userId !== parseInt(req.params.hostid) ) {
      return res.json({message : "nope"});
    }

    const hostId = req.params.hostid;

    const workspaces = await workspaceDatamapper.getWorkspacesByHostId(hostId);

    for (const workspace of workspaces) {
      workspace.json_build_object.workspace.city = workspace.json_build_object.workspace.city.charAt(0).toUpperCase() + workspace.json_build_object.workspace.city.slice(1);
    }

    res.json(workspaces);
  },

  async create(req, res) {
    const workspaceToCreate = req.body;
    workspaceToCreate.user_id = req.userId;
    
    const mainImage = workspaceToCreate.workspace_mainImage;
    delete workspaceToCreate.workspace_mainImage;

    const otherImagesLink = workspaceToCreate.otherImagesLink.split(',');
    delete workspaceToCreate.otherImagesLink;
    
    workspaceToCreate.city = workspaceToCreate.city.toLowerCase();
    
    const coordinates = await mapServices.findLocation(req.body.address,req.body.zip_code, req.body.city);
    
    workspaceToCreate.latitude = coordinates.latitude;
    workspaceToCreate.longitude = coordinates.longitude;
    
    // Equipements
    const { equipments } = workspaceToCreate;
    delete workspaceToCreate.equipments;
    
    const workspaceInstance = await workspaceDatamapper.create(workspaceToCreate);
    
    const workspaceId = workspaceInstance[0].id;
    
    if (equipments) {
      await equipmentDatamapper.associateWorkspaceToEquipment(workspaceId, equipments);
    }
    
    await imageDatamapper.addImage(workspaceId, mainImage, otherImagesLink);
    
    res.json(workspaceInstance);
  },

  async findRandom(_, res) {
    const workspaces = await workspaceDatamapper.getRandom();

    for (const workspace of workspaces ) {
      workspace.city = workspace.city.charAt(0).toUpperCase() + workspace.city.slice(1);
    }

    res.json(workspaces);
  },

  async updateOne(req, res) {
    const workspaceId = parseInt(req.params.id);
    const updatedWorkspace = req.body;

    updatedWorkspace.city = updatedWorkspace.city.toLowerCase();

    const { equipments } = updatedWorkspace;
 

    delete updatedWorkspace.equipments;

    const isAuthorizedToUpdate = await securityDatamapper.checkWorkspaces(req.userId, workspaceId);

    if (!isAuthorizedToUpdate) {
      return res.status(401).send({
        message: "This is not your workspace ! "
      });
    }

    if (equipments) {

      await equipmentDatamapper.update(workspaceId, equipments);
    }

    const result = await workspaceDatamapper.patchOne(workspaceId, updatedWorkspace);

    res.json(result);
  },

  async updateState(req, res) {
    const workspaceId = parseInt(req.params.id);
    const newState = req.body.availability;

    const isAuthorizedToUpdate = await securityDatamapper.checkWorkspaces(req.userId, workspaceId);

    if (!isAuthorizedToUpdate) {
      return res.status(401).send({
        message: "This is not your workspace ! "
      });
    }

    await workspaceDatamapper.patchState(workspaceId, newState);

    res.json({message: `The workspace availabilty was succussfully changed to ${req.body.availability}`});
  },

  async searchWorkspaces(req, res) {
    const searchDetails = req.body;

    req.body.city = req.body.city.toLowerCase();

    const workspacesAvailable = await workspaceDatamapper.getWorkspacesFromSearch(searchDetails);

    res.json(workspacesAvailable);
  },

  async addImages(req, res) {
    const workspaceId = parseInt(req.params.id);

    let result;

    result =  await imageDatamapper.updateImage(workspaceId, req.body);

    res.json(result);
    
  },
  
  async fetchReviews(req, res) {
    const workspaceId = parseInt(req.params.id);

    result = await reviewsDatamapper.getAllWorkspaceReviews(workspaceId);

    res.json({message: "OK"});
  }

}