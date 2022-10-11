const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

const { errorHandler } = require('../helpers/errorHandler');

const sanitizer = require('../middleware/sanitizer');

// Multer 
const multerConfig = require('../services/multerConfig');
const bodyParser = multerConfig.editStorage();

router.use( bodyParser.any() );

// We prefix our api's route
router.use('/api', sanitizer, apiRouter);

// We take in our route into handle errors
router.use((err, _, response, next) => {
    errorHandler(err, response, next);
});


module.exports = router;
