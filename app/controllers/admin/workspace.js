const workspaceDatamapper = require('../../Datamapper/admin/workspace');

module.exports = {
  async findAll(_, res) {
    const workspaces = await workspaceDatamapper.getAll();
    res.json(workspaces);
  },

  async create(req, res) {
    const workspaceToCreate = req.body;

    const newWorkspace = await workspaceDatamapper.add(workspaceToCreate);

    res.json(newWorkspace);
  },

  async updateOne(req,res) {
    const workspaceToUpdate = parseInt(req.params.id);
    const dataToUpdate = req.body;

    const workspaceUpdated = await workspaceDatamapper.patch(workspaceToUpdate, dataToUpdate);

    res.json(workspaceUpdated);
  },

  async deleteOne(req, res) {
    const workspaceToDelete = parseInt(req.params.id);

    await workspaceDatamapper.delete(workspaceToDelete);

    res.json({message: `Worksapce with id ${workspaceToDelete} successfully deleted.`});
  }

}