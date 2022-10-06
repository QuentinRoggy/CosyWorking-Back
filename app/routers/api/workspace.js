const express = require('express');
const router = express.Router();

const controllerHandler = require('../../helpers/controllerHandler');
const verifyAccesRight = require('../../middleware/verifyAccessRight');

const { workspaceController: controller } = require("../../controllers/api")


/**
 * GET /api/workspace/find-random
 * @summary Get 5 random workspace's list
 * @tags Workspace
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.get("/workspace/find-random", controllerHandler(controller.findRandom));

/**
 * GET /api/workspace/:id
 * @summary Get a workspace by id
 * @tags Workspace
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.get("/workspace/:id(\\d+)", controllerHandler(controller.findById));

/**
 * GET /api/personalspace/:hostid/workspace
 * @summary Get workspaces for one host
 * @tags Workspace
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.get("/personalspace/:hostid(\\d+)/workspace", controllerHandler(controller.findWorkspacesByHost));

/**
 * POST /api/workspace/create
 * @summary Create a new workspace
 * @tags Workspace
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.post("/workspace/create", controllerHandler(controller.create));

/**
 * POST /api/workspace/search
 * @summary Get all workspaces according to search
 * @tags Workspace
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.post("/workspace/search", controllerHandler(controller.searchWorkspaces));

/**
 * PATCH /api/workspace/:id
 * @summary Modify a workspace
 * @tags Workspace
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.patch("/workspace/:id(\\d+)", controllerHandler(controller.updateOne));

/**
 * PATCH /api/workspace/state/:id
 * @summary Modify availability of one workspace
 * @tags Workspace
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.patch("/workspace/state/:id(\\d+)", controllerHandler(controller.updateState));


module.exports = router;
