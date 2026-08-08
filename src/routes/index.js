// ROUTES

import express from 'express';
import securityMiddleware from '../middlewares/securityMiddleware.js';
import admissionRoutes from './docugen-web/admissionRoutes.js';
import administrationRoutes from './docugen-web/administrationRoutes.js';
import managementRoutes from './docugen-web/managementRoutes.js';
import utilsRoutes from './utilsRoutes.js';
import lookupRoutes from './lookupRoutes.js';
import { SERVICES } from '../constants/services.js';

const router = express.Router();
const VERSION_ROUTE = SERVICES.backend.routers.version;
const API_ROUTE = SERVICES.backend.routers.base;
const UTILS_ROUTE = SERVICES.backend.routers.utils.base;
const LOOKUP_ROUTE = SERVICES.backend.routers.lookup.base;
const ADMISSION_ROUTE = SERVICES.backend.routers.docugen_web.admission.base;
const ADMINISTRATION_ROUTE = SERVICES.backend.routers.docugen_web.administration.base;
const MANAGEMENT_ROUTE = SERVICES.backend.routers.docugen_web.management.base;

// Main routes
// docugen-web
router.use(ADMISSION_ROUTE, admissionRoutes); // Admission
router.use(ADMINISTRATION_ROUTE, securityMiddleware, administrationRoutes); // Administration
router.use(MANAGEMENT_ROUTE, securityMiddleware, managementRoutes); // Management
// docugen-app

// Utils
router.use(UTILS_ROUTE, securityMiddleware, utilsRoutes);

// Lookup
router.use(LOOKUP_ROUTE, securityMiddleware, lookupRoutes);

// 404 handler (last response when no route is found)
router.use((req, res) => {
  res.status(404).json({ error: 'Not Found', message: 'Ruta de API no encontrada' });
});

const asignRoutes = (app) => {
  app.use(VERSION_ROUTE + API_ROUTE, router);
};

export default asignRoutes;
