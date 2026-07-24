// ADMISSION ROUTES

import express from 'express';
import * as admissionController from '../../controllers/docugen-web/admissionController.js';
import { SERVICES } from '../../constants/services.js';
import securityMiddleware from '../../middlewares/securityMiddleware.js';

const router = express.Router();

const REGISTER_ACCOUNT_ROUTE = SERVICES.backend.routers.docugen_web.admission.register_account;
const LOGIN_USER_ROUTE = SERVICES.backend.routers.docugen_web.admission.start_session;
const LOGOUT_USER_ROUTE = SERVICES.backend.routers.docugen_web.admission.close_session;
const RENEW_ACCESS_ROUTE = SERVICES.backend.routers.docugen_web.admission.renew_access;
const VERIFY_EMAIL_ROUTE = SERVICES.backend.routers.docugen_web.admission.verify_email;
const VERIFY_PASSWORD_ROUTE = SERVICES.backend.routers.docugen_web.admission.verify_password;
const CHECK_USERNAME_ROUTE = SERVICES.backend.routers.docugen_web.admission.check_username;
const GET_USERNAME_ROUTE = SERVICES.backend.routers.docugen_web.admission.get_username;

// Endpoints definition
router.post(REGISTER_ACCOUNT_ROUTE, admissionController.myAccountRegister);
router.post(LOGIN_USER_ROUTE, admissionController.mySessionStarter);
router.post(LOGOUT_USER_ROUTE, securityMiddleware, admissionController.mySessionCloser);
router.post(RENEW_ACCESS_ROUTE, admissionController.accessRenewer);
router.post(VERIFY_EMAIL_ROUTE, admissionController.emailVerifier);
router.post(VERIFY_PASSWORD_ROUTE, securityMiddleware, admissionController.passwordVerifier); //id from cookies
router.post(CHECK_USERNAME_ROUTE, admissionController.usernameChecker);
router.get(GET_USERNAME_ROUTE, securityMiddleware, admissionController.usernameGetter);
export default router;
