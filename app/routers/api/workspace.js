const express = require('express');
const router = express.Router();

const controllerHandler = require('../../helpers/controllerHandler');
const verifyAccesRight = require('../../middleware/verifyAccessRight');

const { workspaceController: controller } = require("../../controllers/api")

// Gives acces to x-access-token in header
router.use(function(_, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/workspace/create", controllerHandler(controller.create));

router.get("/workspace/find-random", controllerHandler(controller.findRandom));

module.exports = router;