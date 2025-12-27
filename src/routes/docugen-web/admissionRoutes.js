// ******************************************************************************
// ROUTES
// ******************************************************************************
import express from 'express';
import * as admissionController from '../../controllers/docugen-web/admissionController.js';
import { SERVICES } from '../../constants/services.js';

const router = express.Router();
const REGISTER_ACCOUNT_ROUTE = SERVICES.backend.routes.docugen_web.admission.register_account;

const LOGIN_USER_ROUTE = SERVICES.backend.routes.docugen_web.admission.start_session;

const LOGOUT_USER_ROUTE = SERVICES.backend.routes.docugen_web.admission.close_session;

const RENEW_ACCESS_ROUTE = SERVICES.backend.routes.docugen_web.admission.renew_access;

//Endpoints definition

router.post(REGISTER_ACCOUNT_ROUTE, admissionController.accountRegister);
router.post(LOGIN_USER_ROUTE, admissionController.sessionStarter);
router.post(LOGOUT_USER_ROUTE, admissionController.sessionCloser);
router.post(RENEW_ACCESS_ROUTE, admissionController.accessRenewer); 
export default router;
// ******************************************************************************
