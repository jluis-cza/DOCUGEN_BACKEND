// EXPRESS APP CONFIGURATION
// Wrapping the app in the middlewares and asigning routes.

import express from 'express';
import path from 'node:path';
import generalMiddleware from './middlewares/generalMiddleware.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
import documentationMiddleware from './middlewares/documentationMiddleware.js';
import asignRoutes from './routes/index.js';

const app = express();
const generatedDir = path.resolve(process.cwd(), 'storage', 'generated');

generalMiddleware(app);
documentationMiddleware(app);
app.use('/generated', express.static(generatedDir));
asignRoutes(app);
errorHandlerMiddleware(app);

export default app;
