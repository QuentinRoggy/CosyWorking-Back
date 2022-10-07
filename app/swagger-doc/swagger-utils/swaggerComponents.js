const { usersProperties, articlesProperties } = require('./swaggerExemples');

const components = {
    schemas: {
        StatusErrors: {
            type: 'object',
            properties: {
                code: {
                    type: 'integer',
                },
                message: {
                    type: 'string'
                }
            }
        },
        //~ 
        Users: {
            type: 'object',
            properties: usersProperties
        },
        Articles: {
            type: 'object',
            properties: articlesProperties
        }
    }
};

module.exports = { components };