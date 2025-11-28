//Routes
import express from "express";
import * as admissionController from "../../controllers/docugen-web/admissionController.js";
import { SERVICES } from "../../constants/services.js";

const router = express.Router();
const REGISTER_ACCOUNT_ROUTE =
 SERVICES.backend.routes.docugen_web.admission.register_account;

//Endpoints definition

router.post(REGISTER_ACCOUNT_ROUTE, admissionController.accountRegister);

export default router;
