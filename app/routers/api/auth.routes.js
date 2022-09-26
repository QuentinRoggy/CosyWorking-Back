const express = require('express');
const router = express.Router();

const verifySignup  = require("../../middleware/verifySignup");
const validate = require('../../validation/validator');
const userCreateSchema = require('../../validation/schemas/userCreateSchema');
const {userController: controller} = require("../../controllers/api");
const controllerHandler = require('../../helpers/controllerHandler');

router.use(function(_, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

  router.post("/auth/signup",[validate('body', userCreateSchema), verifySignup.checkDuplicateEmail], controllerHandler(controller.signup));

  // router.post("/api/auth/signin", controller.signin);

  module.exports = router;