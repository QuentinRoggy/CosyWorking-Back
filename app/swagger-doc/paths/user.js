const {usersProperties, userExample} = require('../swagger-utils/swaggerExemples');

const {error400, error404} = require('../swagger-utils/swaggerStatus');
const {component} = require('../swagger-utils/swaggerComponents.js');

const userId = {

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


module.exports = { userId };