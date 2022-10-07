const express = require('express');
const router = express.Router();

const controllerHandler = require('../../helpers/controllerHandler');
const verifyAccesRight = require('../../middleware/verifyAccessRight');

const { wishlistController: controller } = require("../../controllers/api")


/**
 * POST /api/wishlist
 * @summary 
 * @tags Wishlist
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.post("/wishlist/add", [verifyAccesRight.verifyToken, verifyAccesRight.isAuthenticate] ,controllerHandler(controller.addToWishlist));


/**
 * GET /api/wishlist
 * @summary 
 * @tags Wishlist
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
 router.get("/wishlist/", [verifyAccesRight.verifyToken, verifyAccesRight.isAuthenticate] ,controllerHandler(controller.getWishlist));

module.exports = router;