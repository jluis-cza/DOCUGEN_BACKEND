// ******************************************************************************
// ROUTES
// ******************************************************************************
import express from 'express';
import admissionRoutes from './docugen-web/admissionRoutes.js';
import administrationRoutes from './docugen-web/administrationRoutes.js';
import * as helperRoutes from '../helpers/routes.js';
import { SERVICES } from '../constants/services.js';

const router = express.Router();
const INFO_ROUTE = SERVICES.backend.routes.docugen_web.default;
const HEALTH_ROUTE = SERVICES.backend.routes.docugen_web.health; 
const VERSION_ROUTE = SERVICES.backend.routes.version; 
const API_ROUTE = SERVICES.backend.routes.base;
const ADMISSION_ROUTE = SERVICES.backend.routes.docugen_web.admission.base; 
const ADMINISTRATION_ROUTE = SERVICES.backend.routes.docugen_web.administration.base;

//***Helper routes***
router.get(INFO_ROUTE, helperRoutes.infoRoute);//Info
router.get(HEALTH_ROUTE, helperRoutes.healthRoute);//Service status

//***Main routes***
//docugen-web
router.use(ADMISSION_ROUTE, admissionRoutes); //--> Admission
router.use(ADMINISTRATION_ROUTE, administrationRoutes); //--> Administration

const asignRoutes = (app) => {
  app.use(VERSION_ROUTE + API_ROUTE, router);
  // 404 handler
  app.use(helperRoutes.notFoundRoute);
};

export default asignRoutes;
// ******************************************************************************
