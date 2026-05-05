// ADMINISTRATION ROUTES

import express from 'express';
import * as administrationController from '../../controllers/docugen-web/administrationController.js';
import { SERVICES } from '../../constants/services.js';

const router = express.Router();
const SYSTEM_PARAMETERS_ROUTE =
  SERVICES.backend.routers.docugen_web.administration.resource.system_parameters.base;
const SYSTEM_PARAMETER_ID =
  SERVICES.backend.routers.docugen_web.administration.resource.system_parameters.id;
const ACCOUNTS_ROUTE = SERVICES.backend.routers.docugen_web.administration.resource.accounts.base;
const ACCOUNT_ID = SERVICES.backend.routers.docugen_web.administration.resource.accounts.id;
const SERVICES_ROUTE = SERVICES.backend.routers.docugen_web.administration.resource.services.base;
const SERVICE_ID = SERVICES.backend.routers.docugen_web.administration.resource.services.id;
const CONFIGURATION_ROUTE = SERVICES.backend.routers.docugen_web.administration.configuration;
const MONITOR_ROUTE = SERVICES.backend.routers.docugen_web.administration.monitor;

// Endpoints definition
// ****** Monitors ******
router.get(
  MONITOR_ROUTE + SYSTEM_PARAMETERS_ROUTE,
  administrationController.systemParametersGetter
);
router.get(MONITOR_ROUTE + ACCOUNTS_ROUTE, administrationController.accountsGetter);
router.get(MONITOR_ROUTE + SERVICES_ROUTE, administrationController.servicesGetter);

// ****** Setters ******
router.post(
  CONFIGURATION_ROUTE + SYSTEM_PARAMETERS_ROUTE + SYSTEM_PARAMETER_ID,
  administrationController.systemParameterSetter
);
router.post(
  CONFIGURATION_ROUTE + ACCOUNTS_ROUTE + ACCOUNT_ID,
  administrationController.accountSetter
);
router.post(
  CONFIGURATION_ROUTE + SERVICES_ROUTE + SERVICE_ID,
  administrationController.serviceSetter
);
export default router;
