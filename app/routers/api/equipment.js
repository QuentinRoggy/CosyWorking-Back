const express = require('express');
const router = express.Router();

const controllerHandler = require('../../helpers/controllerHandler');
const verifyAccesRight = require('../../middleware/verifyAccessRight');

const { equipmentController: controller } = require("../../controllers/api")


/**
 * GET /api/equipments
 * @summary Get all equipments
 * @tags Equipments
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.get("/equipments", controllerHandler(controller.findAll));

module.exports = router;