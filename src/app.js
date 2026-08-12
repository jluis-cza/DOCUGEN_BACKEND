// EXPRESS APP CONFIGURATION
// Wrapping the app in the middlewares and asigning routes.

import express from 'express';
import generalMiddleware from './middlewares/generalMiddleware.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
import documentationMiddleware from './middlewares/documentationMiddleware.js';
import asignRoutes from './routes/index.js';

const app = express();

generalMiddleware(app);
documentationMiddleware(app);
app.use('/generated', express.static('storage/generated'));
asignRoutes(app);
errorHandlerMiddleware(app);

export default app;
