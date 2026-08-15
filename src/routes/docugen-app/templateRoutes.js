import express from 'express';
import * as templateController from '../../controllers/docugen-app/templateController.js';
import { SERVICES } from '../../constants/services.js';

const router = express.Router();
const TEMPLATES_ROUTE = SERVICES.backend.routers.docugen_app.templates.base;
const TEMPLATE_ID_ROUTE = SERVICES.backend.routers.docugen_app.templates.id;
const TEMPLATE_PARAMETERS_ROUTE = SERVICES.backend.routers.docugen_app.templates.parameters;
const DOCUMENTS_ROUTE = SERVICES.backend.routers.docugen_app.documents.base;
const GENERATE_DOCUMENT_ROUTE = SERVICES.backend.routers.docugen_app.documents.generate;
const GENERATION_AVAILABILITY_ROUTE = SERVICES.backend.routers.docugen_app.documents.availability;
const RENDER_ROUTE = SERVICES.backend.routers.docugen_app.render;

router.get(TEMPLATES_ROUTE, templateController.listTemplates);
router.post(TEMPLATES_ROUTE, templateController.createTemplate);
router.get(TEMPLATES_ROUTE + TEMPLATE_ID_ROUTE, templateController.getTemplate);
router.get(
  TEMPLATES_ROUTE + TEMPLATE_ID_ROUTE + TEMPLATE_PARAMETERS_ROUTE,
  templateController.getTemplateParameters
);
router.get(
  DOCUMENTS_ROUTE + GENERATION_AVAILABILITY_ROUTE,
  templateController.getGenerationAvailability
);
router.put(TEMPLATES_ROUTE + TEMPLATE_ID_ROUTE, templateController.updateTemplate);
router.delete(TEMPLATES_ROUTE + TEMPLATE_ID_ROUTE, templateController.deleteTemplate);
router.post(DOCUMENTS_ROUTE + GENERATE_DOCUMENT_ROUTE, templateController.generateDocumentRemote);
router.post(RENDER_ROUTE, templateController.renderTemplate);

export default router;
