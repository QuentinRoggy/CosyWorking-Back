const { signupProperties, loginProperties} = require('../swaggerSchemas/auth');
const { userProperties } = require('../swaggerSchemas/user');
const { profilProperties, updateProfilProperties} = require ('../swaggerSchemas/profil');

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
        signup: {
            type: 'object',
            properties: signupProperties
        },
        login: {
            type: 'object',
            properties: loginProperties
        },
        //~
        userId: {
            type: 'object',
            properties: userProperties
        },
        //~
        profilProperties: {
            type: 'object',
            properties: profilProperties
        },
        //~
        updateProfilProperties: {
            type: 'object',
            properties: updateProfilProperties
        }
    }
};

module.exports = { components };