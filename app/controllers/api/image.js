const imageDatamapper = require('../../Datamapper/image');
const fs = require('fs');
const { stringify } = require('querystring');

module.exports = {

    async delete(req, res) {

        const workspaceId = req.params.id;
        const searchDetails = req.body;
    
        const workspaceImageDeleted = await imageDatamapper.deleteWorkspaceImages(workspaceId, searchDetails);
    
        if(workspaceImageDeleted){    
          fs.unlinkSync(`${workspaceImageDeleted[0].link}`);
        } else {
          console.log(`can not find ${imagePath} into ${workspaceImageDeleted}`)
        }

        res.json(workspaceImageDeleted);
    
      }
}