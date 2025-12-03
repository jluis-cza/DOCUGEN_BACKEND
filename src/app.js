// Express app configuration

import express from "express";
import generalMiddleware from "./middlewares/generalMiddleware.js";
import securityMiddleware from "./middlewares/securityMiddleware.js";
import asignRoutes from './routes/index.js'

const app = express();
generalMiddleware(app);
securityMiddleware(app);
asignRoutes(app)

export default app;
