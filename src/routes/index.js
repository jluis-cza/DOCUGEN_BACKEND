// ROUTES

import express from 'express';
import securityMiddleware from '../middlewares/securityMiddleware.js';
import admissionRoutes from './docugen-web/admissionRoutes.js';
import administrationRoutes from './docugen-web/administrationRoutes.js';
import * as helperRoutes from './utils.js';
import { SERVICES } from '../constants/services.js';

const router = express.Router();
const INFO_ROUTE = SERVICES.backend.routers.docugen_web.utils.default;
const HEALTH_ROUTE = SERVICES.backend.routers.docugen_web.utils.health;
const TIME_ROUTE = SERVICES.backend.routers.utils.time;
const VERSION_ROUTE = SERVICES.backend.routers.version;
const API_ROUTE = SERVICES.backend.routers.base;
const ADMISSION_ROUTE = SERVICES.backend.routers.docugen_web.admission.base;
const ADMINISTRATION_ROUTE = SERVICES.backend.routers.docugen_web.administration.base;

// Helper routes
router.get(INFO_ROUTE, helperRoutes.infoRoute); //Info
router.get(HEALTH_ROUTE, helperRoutes.healthRoute); //Service status
router.get(TIME_ROUTE, helperRoutes.timeRoute); // Real server time

// Main routes
// docugen-web
router.use(ADMISSION_ROUTE, admissionRoutes); // Admission
router.use(ADMINISTRATION_ROUTE, securityMiddleware, administrationRoutes); // Administration

const asignRoutes = (app) => {
  app.use(VERSION_ROUTE + API_ROUTE, router);
  // 404 handler
  app.use(helperRoutes.notFoundRoute);
};

export default asignRoutes;
