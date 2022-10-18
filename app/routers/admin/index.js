const express = require('express');
const router = express.Router();

// Middleware && helper && controller
const { adminController } = require('../../controllers/admin')
const giveAccessToken = require('../../middleware/giveAccessToken');
const { ApiError } = require('../../helpers/errorHandler');

// Default prefixing API's route,
router.all('/', adminController.home);

// Import all router files
const workspaceRouter = require('./workspace');

// Gives acces to x-access-token in header
router.use(giveAccessToken);

// Use all router files
router.use(workspaceRouter);

// Use error handler
router.use(() => {
    throw new ApiError('API Route not found', { statusCode: 404 });
});


module.exports = router;
