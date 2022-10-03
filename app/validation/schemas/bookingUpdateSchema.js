const Joi = require('joi');

module.exports = Joi.object({
    stateDescription: Joi.string().required(),
}).required();

