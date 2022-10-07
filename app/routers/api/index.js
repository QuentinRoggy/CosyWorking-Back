const express = require('express');

const { ApiError } = require('../../helpers/errorHandler');
const { apiController } = require('../../controllers/api')

const router = express.Router();
const authRouter = require('./auth');
const bookingRouter = require('./booking');
const profilRouter = require('./profil');
const userRouter = require('./user')
const workspaceRouter = require('./workspace');
const equipmentRouter = require('./equipment');
const reviewRouter = require('./review');

const giveAccessToken = require('../../middleware/giveAccessToken');


// Default prefixing API's route,
router.all('/', apiController.home);

// Gives acces to x-access-token in header
router.use(giveAccessToken);

router.use(authRouter);
router.use(bookingRouter);
router.use(userRouter);
router.use(workspaceRouter);
router.use(equipmentRouter);
router.use(profilRouter);

router.use(reviewRouter);

router.use(() => {
    throw new ApiError('API Route not found', { statusCode: 404 });
});

module.exports = router;
