const {usersProperties, userExample} = require('../swagger-utils/swaggerExemples');

const {error400, error404} = require('../swagger-utils/swaggerStatus');
const {component} = require('../swagger-utils/swaggerComponents.js');

const signup = {

    //~ --------------------------------------------- FETCH ALL USERS
    get: {
        tags: ['Users'],
        summary: 'Récupération des utilisateurs',
        responses: {
            200: {
                description: 'Requête réussie',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:usersProperties,
                            example: userExample  
                        }
                    }
                }
            },
            404: error404
        }
    },

// [...,... all other methods]

}

const loggin = {

    //~ --------------------------------------------- FETCH ALL USERS
    get: {
        tags: ['Users'],
        summary: 'Récupération des utilisateurs',
        responses: {
            200: {
                description: 'Requête réussie',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties:usersProperties,
                            example: userExample  
                        }
                    }
                }
            },
            404: error404
        }
    },
}

module.exports = {signup, loggin};