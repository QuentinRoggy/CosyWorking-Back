require("dotenv").config();
const userDatamapper = require("../../Datamapper/user");
const roleDatamapper = require("../../Datamapper/role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  },

  async login(req, res) {
    const emailToFInd = req.body.email;

    const user = await userDatamapper.findUserLoggedByEmail(emailToFInd);

    if (user.length === 0) {
      res.status(404).send({
        message: "User not found"});
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user[0].password
    );

    if (!passwordIsValid) {
      res.status(401).send({
        message: "Invalid password"});
    }

    var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    user[0].token = token;

    res.json(user);
  }

};

module.exports = userController;
