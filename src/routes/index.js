import express from "express";
import admissionRoutes from "./docugen-web/admissionRoutes.js";
import * as helperRoutes from "../helpers/routes.js";
import { SERVICES } from "../constants/services.js";

const router = express.Router();
const INFO_ROUTE = SERVICES.backend.routes.docugen_web.default; // /v1/api/
const HEALTH_ROUTE = SERVICES.backend.routes.docugen_web.health; // /v1/api/health
const ADMISSION_ROUTE = SERVICES.backend.routes.docugen_web.admission.base; // /v1/api/auth
const VERSION_ROUTE = SERVICES.backend.routes.version; // /v1
const API_ROUTE = SERVICES.backend.routes.base; // /v/api

//------Helper routes------
//Info
router.get(INFO_ROUTE, helperRoutes.infoRoute);

//Service status
router.get(HEALTH_ROUTE, helperRoutes.healthRoute);

//------Main routes------
//->docugen-web
//-->Admission
router.use(ADMISSION_ROUTE, admissionRoutes);

const asignRoutes = (app) => {
 app.use(VERSION_ROUTE + API_ROUTE, router);
 // 404 handler
 app.use(helperRoutes.notFoundRoute);
};

export default asignRoutes;
