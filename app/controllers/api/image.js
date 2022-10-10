const imageDatamapper = require('../../Datamapper/image');
const fs = require('fs');

module.exports = {

    async delete(req, res) {

        const workspaceId = req.params.id;
    
        const searchDetails = req.body;
    
        const workspaceImageDeleted = await imageDatamapper.deleteWorkspaceImages(workspaceId, searchDetails);
    
        if(workspaceImageDeleted){
    
          const imagePath = [];
    
          for(const key of workspaceImageDeleted){
            const value = key.link;
    
            imagePath.push(value)
          }
    
          console.log(imagePath)
    
          fs.unlinkSync(stringify(imagePath));
        } else {
          console.log(`can not find ${imagePath} into ${workspaceImageDeleted}`)
        }
    
      }
}