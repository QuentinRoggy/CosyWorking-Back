const userDatamapper = require('../Datamapper/user');

const verifySignup = {
  async checkDuplicateEmail (req, res, next) {
    const emailToFind = req.body.email;
    const user = await userDatamapper.findByEmail(emailToFind);

    if (user.length > 0) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      return;
    } 
    next();
  }
};

module.exports = verifySignup;
