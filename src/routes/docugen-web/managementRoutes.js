// UTIL ROUTES
import express from 'express';
import * as managementController from '../../controllers/docugen-web/managementController.js';
import { SERVICES } from '../../constants/services.js';

const router = express.Router();

const ACTIVITIES_ROUTE = SERVICES.backend.routers.docugen_web.management.resource.activities.base;
const ACTIVITY_ID = SERVICES.backend.routers.docugen_web.management.resource.activities.id;
const PROCESSES_ROUTE = SERVICES.backend.routers.docugen_web.management.resource.processes.base;
const PROCESS_ID = SERVICES.backend.routers.docugen_web.management.resource.processes.id;
const NOTIFICATIONS_ROUTE =
  SERVICES.backend.routers.docugen_web.management.resource.notifications.base;
// const NOTIFICATION_ID = SERVICES.backend.routers.docugen_web.management.resource.notifications.id;
const PROFILES_ROUTE = SERVICES.backend.routers.docugen_web.management.resource.profiles.base;
const PROFILE_ID = SERVICES.backend.routers.docugen_web.management.resource.profiles.id;
const MONITOR_ROUTE = SERVICES.backend.routers.docugen_web.management.monitor;
const CONFIGURATION_ROUTE = SERVICES.backend.routers.docugen_web.management.configuration;

// Endpoints definition
// *The "get" endpoints use query params to filter and select their resources
router.get(MONITOR_ROUTE + ACTIVITIES_ROUTE, managementController.activitiesGetter);
router.get(MONITOR_ROUTE + ACTIVITIES_ROUTE + ACTIVITY_ID, managementController.activityGetter);
router.get(MONITOR_ROUTE + PROCESSES_ROUTE, managementController.processesGetter);
router.get(MONITOR_ROUTE + PROCESSES_ROUTE + PROCESS_ID, managementController.processGetter);
router.get(MONITOR_ROUTE + PROFILES_ROUTE + PROFILE_ID, managementController.profileGetter);
router.get(MONITOR_ROUTE + NOTIFICATIONS_ROUTE, managementController.notificationsGetter);
router.post(CONFIGURATION_ROUTE + NOTIFICATIONS_ROUTE, managementController.notificationCreator);
router.post(CONFIGURATION_ROUTE + PROFILES_ROUTE + PROFILE_ID, managementController.profileSetter);
export default router;
