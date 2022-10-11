const swagger = require('swagger-jsdoc');
const swaggerJSDoc = swagger;
const { serve, setup } = require('swagger-ui-express');
const { components } = require ('./swagger-utils/swaggerComponents.js');

const { signup, login } = require('./paths/auth');
const { userId } = require('./paths/user');
const { getProfil, patchProfil} =  require('./paths/profil');
const { equipment } = require ('./paths/equipment');


const options = {

    definition: {

        // Les informations principales
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'CosyWorking',
            description: `Location espace de travail.`,
            license: {
                name: 'MIT'
            },
        },
      
        // Tous les serveurs
        servers: [
            {
                url: 'http://localhost:3000/docs',
                description: 'API v1'
            },
            // {
            //     url: 'http://localhost:4100/api/v2',
            //     description: 'API v2'
            // },
        ],
       
        // Tous les chemins ( GET / POST / PATCH / DELETE )
        paths: {

            //~ ------------- AUTH
            '/api/auth/signup': signup,
            '/api/auth/login': login,
            
            //~ ------------- USER
            '/api/user/{id}': userId,

            //~ ------------- PROFIL
            '/personalspace/{id}/profil': getProfil,
            '/personalspace/{id}/profil ': patchProfil,

            // //~ ------------- WORKSPACE
            // '/api/workspace/find-random': workspace,
            // '/api/workspace/{id}': workspace,
            // '/api/personalspace/:hostid(\\d+)/workspace': workspace,
            // '/api/workspace/create': workspace, 
            // '/api/workspace/search': workspace,
            // '/api/workspace/{id}': workspace,
            // '/api/workspace/state/{id}': workspace,

            // //~ ------------- EQUIPMENT
            '/api/equipments': equipment,
            
            // //~ ------------- BOOKING
            // '/api/personalspace/{id}/coworkerbooking': booking,
            // '/api/workspace/{id}/bookeddate': booking,
            // '/api/personalspace/:{hostid}/booking': booking,
            // '/api/booking/request': booking,
            // '/api/booking/{id}/state': booking
            // //~ ------------- IMAGE
        },

        // Tous les schemas
        components,

        // Element correspondant à la sécurité
        securitySchemes: {
            api_key: {
                type: 'apiKey',
                name: 'api_key',
                in: 'header'
            },
        }
    },

    apis: ['./app/routers/*.js']
    // Equivalent à 
    // apis: ['./*/*/*.js']
};

const specs = swaggerJSDoc(options);


module.exports =  { specs, serve, setup};
