const express = require('express');
const router = express.Router();

// ERROR HANDLER
const controllerHandler = require('../../helpers/controllerHandler');

// CONTROLLER
const { workspaceController: controller } = require("../../controllers/admin");


//~ ---------- GET
router.get("/workspace", controllerHandler(controller.findAll));

//~ ---------- POST
router.post("/workspace", controllerHandler(controller.create));

//~ ---------- PATCH
router.patch("/workspace/:id(\\d+)", controllerHandler(controller.updateOne));

//~ ---------- DELETE
router.delete("/workspace/:id(\\d+)", controllerHandler(controller.deleteOne));




module.exports = router;
