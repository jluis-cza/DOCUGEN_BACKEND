// ADMINISTRATION ROUTES

import express from 'express';
import * as administrationController from '../../controllers/docugen-web/administrationController.js';
import { SERVICES } from '../../constants/services.js';

const router = express.Router();
const SYSTEM_PARAMETERS_ROUTE =
  SERVICES.backend.routers.docugen_web.administration.resource.system_parameters;
// const ACCOUNTS_ROUTE = SERVICES.backend.routers.docugen_web.administration.resource.accounts;
// const SERVICES_ROUTE = SERVICES.backend.routers.docugen_web.administration.resource.services;
const CONFIGURATION_ROUTE = SERVICES.backend.routers.docugen_web.administration.configuration;
const MONITOR_ROUTE = SERVICES.backend.routers.docugen_web.administration.monitor;

// Endpoints definition
router.get(
  MONITOR_ROUTE + SYSTEM_PARAMETERS_ROUTE,
  administrationController.systemParametersGetter
);
router.post(
  CONFIGURATION_ROUTE + SYSTEM_PARAMETERS_ROUTE,
  administrationController.systemParameterSetter
);

export default router;
