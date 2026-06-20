// UTIL ROUTES
import express from 'express';
import * as utilsController from '../controllers/utilsController.js';
import { SERVICES } from '../constants/services.js';

const router = express.Router();

const ROUTES_INFO_ROUTE = SERVICES.backend.routers.utils.routes_info;
const SERVER_TIME_ROUTE = SERVICES.backend.routers.utils.time;
const ACTIVITIES_ROUTE = SERVICES.backend.routers.utils.activities.base;
const PROCESSES_ROUTE = SERVICES.backend.routers.utils.processes.base;
const PROCESS_ID = SERVICES.backend.routers.utils.processes.id;
const ACTIVITY_ID = SERVICES.backend.routers.utils.activities.id;

// Endpoints definition
router.get(ROUTES_INFO_ROUTE, utilsController.routesInfoGetter);
router.get(SERVER_TIME_ROUTE, utilsController.serverTimeGetter);
router.get(ACTIVITIES_ROUTE, utilsController.activitiesGetter);
router.get(PROCESSES_ROUTE, utilsController.processesGetter);
router.get(PROCESSES_ROUTE + PROCESS_ID, utilsController.processGetter);
router.get(ACTIVITIES_ROUTE + ACTIVITY_ID, utilsController.activityGetter);

export default router;
