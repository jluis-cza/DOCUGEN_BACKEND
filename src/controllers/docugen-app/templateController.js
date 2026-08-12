import * as templateService from '../../services/docugen-app/templateService.js';

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
  try {
    const response = await templateService.createTemplate({
      ownerId: req.user.id,
      payload: req.body,
    });

    return res.status(201).json({
      success: true,
      code: 'S2003',
      message: 'Plantilla creada correctamente.',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTemplate = async (req, res, next) => {
  try {
    const { template_id } = req.params;
    const response = await templateService.updateTemplate({
      id: template_id,
      ownerId: req.user.id,
      payload: req.body,
    });

    return res.status(200).json({
      success: true,
      code: 'S2004',
      message: 'Plantilla actualizada correctamente.',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTemplate = async (req, res, next) => {
  try {
    const { template_id } = req.params;
    const response = await templateService.deleteTemplate({
      id: template_id,
      ownerId: req.user.id,
    });

    return res.status(200).json({
      success: true,
      code: 'S2005',
      message: 'Plantilla eliminada correctamente.',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const renderTemplate = async (req, res, next) => {
  try {
    const protocol = req.get('x-forwarded-proto') || req.protocol;
    const host = req.get('x-forwarded-host') || req.get('host');
    const baseUrl = host ? `${protocol}://${host}` : undefined;

    const response = await templateService.renderTemplate({
      ownerId: req.user.id,
      payload: req.body,
      baseUrl,
    });

    return res.status(200).json({
      success: true,
      code: 'S2006',
      message: 'Documento generado correctamente.',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
