import * as templateService from '../../services/docugen-app/templateService.js';
import {
  registerProcess,
  registerActivity,
  setActivitySuccess,
  terminateProcess,
} from '../../services/docugen-web/managementServices.js';

export const listTemplates = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const ownerId = req.user.id;
    const response = await templateService.listTemplates({ ownerId, page, limit, search });
    return res.status(200).json({
      success: true,
      code: 'S2001',
      message: 'Plantillas consultadas correctamente.',
      data: { templates: response.items },
      metadata: {
        templates: {
          page: Number(page),
          limit: Number(limit),
          total: response.total,
          search,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTemplate = async (req, res, next) => {
  try {
    const { template_id } = req.params;
    const response = await templateService.getTemplate({ id: template_id, ownerId: req.user.id });
    return res.status(200).json({
      success: true,
      code: 'S2002',
      message: 'Plantilla obtenida correctamente.',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const createTemplate = async (req, res, next) => {
  const processId = await registerProcess('P0401', req.sess.id, req.user.id);
  let activity = {};
  try {
    activity = await registerActivity(1, processId);
    const response = await templateService.createTemplate({
      ownerId: req.user.id,
      payload: req.body,
    });
    await setActivitySuccess(activity._id, true);

    return res.status(201).json({
      success: true,
      code: 'S2003',
      message: 'Plantilla creada correctamente.',
      data: response,
    });
  } catch (error) {
    if (activity?._id) await setActivitySuccess(activity._id, false);
    next(error);
  } finally {
    await terminateProcess(processId);
  }
};

export const updateTemplate = async (req, res, next) => {
  const processId = await registerProcess('P0402', req.sess.id, req.user.id);
  let activity = {};
  try {
    const { template_id } = req.params;
    activity = await registerActivity(1, processId);
    const response = await templateService.updateTemplate({
      id: template_id,
      ownerId: req.user.id,
      payload: req.body,
    });
    await setActivitySuccess(activity._id, true);

    return res.status(200).json({
      success: true,
      code: 'S2004',
      message: 'Plantilla actualizada correctamente.',
      data: response,
    });
  } catch (error) {
    if (activity?._id) await setActivitySuccess(activity._id, false);
    next(error);
  } finally {
    await terminateProcess(processId);
  }
};

export const deleteTemplate = async (req, res, next) => {
  const processId = await registerProcess('P0403', req.sess.id, req.user.id);
  let activity = {};
  try {
    const { template_id } = req.params;
    activity = await registerActivity(1, processId);
    const response = await templateService.deleteTemplate({
      id: template_id,
      ownerId: req.user.id,
    });
    await setActivitySuccess(activity._id, true);

    return res.status(200).json({
      success: true,
      code: 'S2005',
      message: 'Plantilla eliminada correctamente.',
      data: response,
    });
  } catch (error) {
    if (activity?._id) await setActivitySuccess(activity._id, false);
    next(error);
  } finally {
    await terminateProcess(processId);
  }
};

export const getTemplateParameters = async (req, res, next) => {
  try {
    const { template_id } = req.params;
    const response = await templateService.getTemplateParameters({
      id: template_id,
      ownerId: req.user.id,
    });

    return res.status(200).json({
      success: true,
      code: 'S2007',
      message: 'Parámetros dinámicos de la plantilla recuperados correctamente.',
      data: {
        template: response.template,
        parameters: response.parameters,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getGenerationAvailability = async (req, res, next) => {
  try {
    const response = await templateService.getGenerationAvailability({
      ownerId: req.user.id,
    });

    return res.status(200).json({
      success: true,
      code: 'S2008',
      message: 'Disponibilidad del servicio de generación consultada correctamente.',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const generateDocumentRemote = async (req, res, next) => {
  const processId = await registerProcess('P0701', req.sess.id, req.user.id);
  let activity = {};
  try {
    activity = await registerActivity(1, processId);
    const protocol = req.get('x-forwarded-proto') || req.protocol;
    const host = req.get('x-forwarded-host') || req.get('host');

    // Solo usar remoteHost si es un dominio real (no localhost ni 127.0.0.1)
    let remoteHost = undefined;
    if (
      host &&
      !host.includes(':3000') &&
      !host.includes('localhost') &&
      !host.includes('127.0.0.1')
    ) {
      remoteHost = `${protocol}://${host}`;
    }

    const response = await templateService.generateDocumentRemote({
      ownerId: req.user.id,
      payload: req.body,
      baseUrl: remoteHost,
    });
    await setActivitySuccess(activity._id, true);

    return res.status(200).json({
      success: true,
      code: 'S2009',
      message: 'Documento generado remotamente correctamente.',
      data: response,
    });
  } catch (error) {
    if (activity?._id) await setActivitySuccess(activity._id, false);
    next(error);
  } finally {
    await terminateProcess(processId);
  }
};

export const renderTemplate = async (req, res, next) => {
  const processId = await registerProcess('P0701', req.sess.id, req.user.id);
  let activity = {};
  try {
    activity = await registerActivity(1, processId);
    const protocol = req.get('x-forwarded-proto') || req.protocol;
    const host = req.get('x-forwarded-host') || req.get('host');

    // Solo usar remoteHost si es un dominio real (no localhost ni 127.0.0.1)
    let remoteHost = undefined;
    if (
      host &&
      !host.includes(':3000') &&
      !host.includes('localhost') &&
      !host.includes('127.0.0.1')
    ) {
      remoteHost = `${protocol}://${host}`;
    }

    const response = await templateService.renderTemplate({
      ownerId: req.user.id,
      payload: req.body,
      baseUrl: remoteHost,
    });
    await setActivitySuccess(activity._id, true);

    return res.status(200).json({
      success: true,
      code: 'S2006',
      message: 'Documento generado correctamente.',
      data: response,
    });
  } catch (error) {
    if (activity?._id) await setActivitySuccess(activity._id, false);
    next(error);
  } finally {
    await terminateProcess(processId);
  }
};
