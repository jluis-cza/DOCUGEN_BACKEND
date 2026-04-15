import swaggerJsdoc from 'swagger-jsdoc';
import { SERVICES } from '../constants/services.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DOCUGEN API',
      version: '1.0.0',
      description: 'Documentación de la API REST del sistema DOCUGEN',
      contact: {
        name: 'JL',
        email: 'jluis.cza@gmail.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${SERVICES.backend.port}`,
        description: 'Development server',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // JSDOCS files
  apis: ['../docs/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;