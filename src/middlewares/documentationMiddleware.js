import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/documentation.js';

const documentationMiddleware = (app) => {
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customSiteTitle: 'DOCUGEN API Docs',
    })
  );
};

export default documentationMiddleware;
