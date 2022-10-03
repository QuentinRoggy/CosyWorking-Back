const express = require('express');
const router = express.Router();

const {userController: controller} = require("../../controllers/api");
const controllerHandler = require('../../helpers/controllerHandler');


router.get('/user/:id', controllerHandler(controller.findUserById))

module.exports = router;