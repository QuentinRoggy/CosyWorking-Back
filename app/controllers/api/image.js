const imageDatamapper = require('../../Datamapper/image');

module.exports = {

    async delete(req, res) {

        const workspaceId = req.params.id;
        const searchDetails = req.body;
    
        const workspaceImageDeleted = await imageDatamapper.deleteWorkspaceImages(workspaceId, searchDetails);
    
        res.json(workspaceImageDeleted);
    
      }
}