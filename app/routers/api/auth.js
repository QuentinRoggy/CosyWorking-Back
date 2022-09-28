const express = require('express');
const router = express.Router();

const verifySignup  = require("../../middleware/verifySignup");
const validate = require('../../validation/validator');
const userCreateSchema = require('../../validation/schemas/userCreateSchema');
const {userController: controller} = require("../../controllers/api");
const controllerHandler = require('../../helpers/controllerHandler');
const verifyAccesRight = require('../../middleware/verifyAccessRight');

// Gives acces to x-access-token in header
router.use(function(_, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

/** 
 * POST /api/auth/signup
 * @summary Create a new User
 * @tags User
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.post("/auth/signup",[validate('body', userCreateSchema), verifySignup.checkDuplicateEmail], controllerHandler(controller.signup));

/**
 * POST /api/auth/login
 * @summary Login a User
 * @tags User
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 404 - Restaurant not found - application/json
 */
router.post("/auth/login", controllerHandler(controller.login));

/**
 * test
 */
router.get("/coworker", [verifyAccesRight.verifyToken, verifyAccesRight.isCoworker], controllerHandler(controller.coworker));

module.exports = router;