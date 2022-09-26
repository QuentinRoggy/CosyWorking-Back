const userDatamapper = require("../../Datamapper/user");
const roleDatamapper = require("../../Datamapper/role");
const bcrypt = require("bcryptjs");

const userController = {

  async signup(req, res) {
    const userToInsert = req.body;

    const descriptionToFind = req.body.role_id;
    const idRole = await roleDatamapper.findByDescription(descriptionToFind);

    if (!idRole) {
      res.status(400).send({
        message: "Failed! Role not found!"
      });
      return;
    }

    userToInsert.role_id = idRole[0].id;
    userToInsert.password = bcrypt.hashSync(req.body.password, 8);

    const result = await userDatamapper.create(userToInsert);

    res.json(result);
  }

};

module.exports = userController;
