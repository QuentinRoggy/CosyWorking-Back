const imageDatamapper = require('../../Datamapper/image');
const fs = require('fs');
const { stringify } = require('querystring');

module.exports = {

    async delete(req, res) {

        const workspaceId = req.params.id;
        const searchDetails = req.body;
    
        const workspaceImageDeleted = await imageDatamapper.deleteWorkspaceImages(workspaceId, searchDetails);
    
        if(workspaceImageDeleted){
    
          const rawPath = [];
    
          for(const key of workspaceImageDeleted){
            const value = key.link;
    
            rawPath.push(value)
          }
    
          // console.log(rawPath[0])

          const imagePath = stringify(rawPath);

          // console.log(imagePath)
    
          // fs.unlinkSync(`/${imagePath}`);
          fs.unlinkSync(`${rawPath[0]}`);
        } else {
          console.log(`can not find ${imagePath} into ${workspaceImageDeleted}`)
        }

        res.json(workspaceImageDeleted);
    
      }
}