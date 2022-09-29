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

/**
 * GET /workspace/find-random
 */
router.get("/workspace/find-random", controllerHandler(controller.findRandom));

/**
 * GET /workspace/:id
 */
router.get("/workspace/:id(\\d+)", controllerHandler(controller.findById));

/**
 * GET personalspace/:hostid/workspace
 */
router.get("/personalspace/:hostid(\\d+)/workspace", controllerHandler());

/**
 * POST /workspace/create
 */
router.post("/workspace/create", controllerHandler(controller.create));

/**
 * POST /workspace/search"
 */
router.post("/workspace/search", controllerHandler());

/**
 * PATCH workspace/:id
 */
router.patch("workspace/:id(\\d+)", controllerHandler());

/**
 * PATCH /workspace/state/:id
 */
router.patch("/workspace/state/:id(\\d+)", controllerHandler());


module.exports = router;