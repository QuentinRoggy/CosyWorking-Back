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
 * @summary Get 5 random workspace's list
 * @tags Workspace
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.get("/workspace/find-random", controllerHandler(controller.findRandom));

/**
 * GET /workspace/:id
 * @summary Get a workspace by id
 * @tags Workspace
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.get("/workspace/:id(\\d+)", controllerHandler(controller.findById));

/**
 * GET personalspace/:hostid/workspace
 * @summary Get workspaces for one host
 * @tags Workspace
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.get("/personalspace/:hostid(\\d+)/workspace", controllerHandler(controller.findWorkspacesByHost));

/**
 * POST /workspace/create
 * @summary Create a new workspace
 * @tags Workspace
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.post("/workspace/create", controllerHandler(controller.create));

/**
 * POST /workspace/search"
 * @summary Get all workspaces according to search
 * @tags Workspace
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.post("/workspace/search", controllerHandler(controller.searchWorkspaces));

/**
 * PATCH workspace/:id
 * @summary Modify a workspace
 * @tags Workspace
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.patch("/workspace/:id(\\d+)", controllerHandler(controller.updateOne));

/**
 * PATCH /workspace/state/:id
 * @summary Modify availability of one workspace
 * @tags Workspace
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.patch("/workspace/state/:id(\\d+)", controllerHandler(controller.updateState));


module.exports = router;
