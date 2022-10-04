const express = require('express');
const router = express.Router();

const controllerHandler = require('../../helpers/controllerHandler');
const verifyAccesRight = require('../../middleware/verifyAccessRight');

const { equipmentController: controller } = require("../../controllers/api")

// Gives acces to x-access-token in header
router.use(function(_, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

/**
 * GET /api/equipments
 * @summary Get all equipments
 * @tags Equipments
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.get("/equipments", controllerHandler(controller.findAll));

module.exports = router;