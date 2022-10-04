const express = require('express');
const router = express.Router();

const controllerHandler = require('../../helpers/controllerHandler');
const { profilController } = require("../../controllers/api");

/**
 * GET /personnalspace/:id(\\d+)/profil
 * @summary Get personalspace by id
 * @tags Profil
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.get("/personnalspace/:id(\\d+)/profil", controllerHandler(profilController.findPersonalspaceById));

/**
 * PATCH /personnalspace/:id(\\d+)/profil
 * @summary 
 * @tags Profil
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
// router.patch("/personnalspace/:id(\\d+)/profil", controllerHandler());

/**
 * DELETE /personnalspace/:id(\\d+)/profil
 * @summary 
 * @tags Profil
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
// router.delete("/personnalspace/:id(\\d+)/profil", controllerHandler());

module.exports = router;