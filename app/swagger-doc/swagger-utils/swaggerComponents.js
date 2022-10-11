const { signupProperties, loginProperties} = require('../swaggerSchemas/auth');
const { userProperties } = require('../swaggerSchemas/user');
const { profilProperties, updateProfilProperties} = require ('../swaggerSchemas/profil');
const { equipmentProperties } = require ('../swaggerSchemas/equipment');

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
        },
        //~
        equipmentProperties: {
            type: 'object',
            properties: equipmentProperties
        }
    }
};

module.exports = { components };