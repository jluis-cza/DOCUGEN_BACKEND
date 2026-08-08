// UTIL ROUTES
import express from 'express';
import * as utilsController from '../controllers/utilsController.js';
import { SERVICES } from '../constants/services.js';

const router = express.Router();

const ROUTES_INFO_ROUTE = SERVICES.backend.routers.utils.routes;
const SERVER_TIME_ROUTE = SERVICES.backend.routers.utils.time;

// Endpoints definition
router.get(ROUTES_INFO_ROUTE, utilsController.routesInfoGetter);
router.get(SERVER_TIME_ROUTE, utilsController.serverTimeGetter);

export default router;
