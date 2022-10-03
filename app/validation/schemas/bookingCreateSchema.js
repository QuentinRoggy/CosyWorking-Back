const Joi = require('joi');

module.exports = Joi.object({
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    user_id: Joi.number().required(),
    workspace_id: Joi.number().required(),
}).required();
