// API TOKEN ROUTES
// Endpoints para gestión de tokens de API independientes

import express from 'express';
import * as apiTokenController from '../../controllers/docugen-app/apiTokenController.js';
import { SERVICES } from '../../constants/services.js';

const router = express.Router();

const API_TOKENS_ROUTE = SERVICES.backend.routers.docugen_app.api_tokens.base;
const API_TOKEN_ID_ROUTE = SERVICES.backend.routers.docugen_app.api_tokens.id;
const API_TOKEN_USAGE_ROUTE = SERVICES.backend.routers.docugen_app.api_tokens.usage;

// CRUD Operations
router.get(API_TOKENS_ROUTE, apiTokenController.getAPITokens);
router.post(API_TOKENS_ROUTE, apiTokenController.createAPIToken);
router.get(API_TOKENS_ROUTE + API_TOKEN_ID_ROUTE, apiTokenController.getAPIToken);
router.put(API_TOKENS_ROUTE + API_TOKEN_ID_ROUTE, apiTokenController.updateAPIToken);
router.delete(API_TOKENS_ROUTE + API_TOKEN_ID_ROUTE, apiTokenController.deleteAPIToken);

// Revoke (special endpoint)
router.post(API_TOKENS_ROUTE + API_TOKEN_ID_ROUTE + '/revoke', apiTokenController.revokeAPIToken);

// Usage statistics
router.get(
  API_TOKENS_ROUTE + API_TOKEN_ID_ROUTE + API_TOKEN_USAGE_ROUTE,
  apiTokenController.getTokenUsage
);

export default router;
