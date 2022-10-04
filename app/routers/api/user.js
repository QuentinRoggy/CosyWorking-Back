const express = require('express');
const router = express.Router();

const {userController: controller} = require("../../controllers/api");
const controllerHandler = require('../../helpers/controllerHandler');

/**
 * GET /user/:id(\\d+)
 * @summary Get user by id
 * @tags USER
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.get('/user/:id(\\d+)', controllerHandler(controller.findUserById))

module.exports = router;