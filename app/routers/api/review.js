const express = require('express');
const router = express.Router();

const controllerHandler = require('../../helpers/controllerHandler');
const { reviewController: controller } = require("../../controllers/api");
const verifyAccesRight = require('../../middleware/verifyAccessRight');

/**
 * POST /api/workspace-review
 * @summary Add a workspace review
 * @tags Profil
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.post("/review/workspace/:id",[verifyAccesRight.verifyToken, verifyAccesRight.isAuthenticate], controllerHandler(controller.addReview));


module.exports = router;