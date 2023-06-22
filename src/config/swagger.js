import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce API',
            version: '1.0.0',
            description: 'API de ecommerce en Node.js y Express',
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },
        ],
    },
    apis: ['./controllers/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export {
    swaggerUi,
    swaggerDocs,
};