// Express app configuration

import express from "express";
import generalMiddleware from "./middlewares/generalMiddleware.js";
import asignRoutes from './routes/index.js'

const app = express();
generalMiddleware(app);
asignRoutes(app)

export default app;
