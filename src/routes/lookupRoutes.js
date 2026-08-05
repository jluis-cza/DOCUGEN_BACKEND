// UTIL ROUTES
import express from 'express';
import * as lookupController from '../controllers/lookupController.js';
import { SERVICES } from '../constants/services.js';

const router = express.Router();

const ACCOUNTS_ROUTE = SERVICES.backend.routers.lookup.resource.accounts.base
const ROLES_ROUTE = SERVICES.backend.routers.lookup.resource.roles.base
const ROLES_ADMIN_ROUTE = SERVICES.backend.routers.lookup.resource.roles.admin

// DOCUGEN-WEB
router.get( ACCOUNTS_ROUTE + ROLES_ROUTE + ROLES_ADMIN_ROUTE, lookupController.adminAccountsLookup)

export default router;
