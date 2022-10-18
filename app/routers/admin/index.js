const express = require('express');
const router = express.Router();

// Middleware && helper && controller
const giveAccessToken = require('../../middleware/giveAccessToken');
const { ApiError } = require('../../helpers/errorHandler');

// Import all router files


// Gives acces to x-access-token in header
router.use(giveAccessToken);

// Use all router files


// Use error handler
router.use(() => {
    throw new ApiError('API Route not found', { statusCode: 404 });
});


module.exports = router;
