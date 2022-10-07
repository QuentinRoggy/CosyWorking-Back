const express = require('express');
const router = express.Router();

const controllerHandler = require('../../helpers/controllerHandler');
const { profilController } = require("../../controllers/api");
const verifyAccesRight = require('../../middleware/verifyAccessRight');

// /**
//  * GET /api/personalspace/:id(\\d+)/profil
//  * @summary Get personalspace by id
//  * @tags Profil
//  * @return {ApiError} 400 - Bad request response - application/json
//  * @return {ApiError} 404 - Restaurant not found - application/json
//  */
router.get("/personalspace/:id(\\d+)/profil",[verifyAccesRight.verifyToken, verifyAccesRight.isAuthenticate], controllerHandler(profilController.findPersonalspaceById));

// /**
//  * PATCH /api/personalspace/:id(\\d+)/profil
//  * @summary 
//  * @tags Profil
//  * @return {ApiError} 400 - Bad request response - application/json
//  * @return {ApiError} 404 - Restaurant not found - application/json
//  */
router.patch("/personalspace/:id(\\d+)/profil",[verifyAccesRight.verifyToken, verifyAccesRight.isAuthenticate], controllerHandler(profilController.updatePersonalspace));

// /**
//  * DELETE /api/personalspace/:id(\\d+)/profil
//  * @summary 
//  * @tags Profil
//  * @return {ApiError} 400 - Bad request response - application/json
//  * @return {ApiError} 404 - Restaurant not found - application/json
//  */
// router.delete("/personalspace/:id(\\d+)/profil", controllerHandler());

module.exports = router;