const express = require('express');

const { ApiError } = require('../../helpers/errorHandler');
const { apiController } = require('../../controllers/api')

const router = express.Router();
const authRouter = require('./auth.routes');


// Default prefixing API's route, 
router.all('/', apiController.home);

router.use(authRouter);

router.use(() => {
    throw new ApiError('API Route not found', { statusCode: 404 });
});

module.exports = router;
