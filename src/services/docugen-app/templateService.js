import Template from '../../models/docugen-app/Template.js';
import Service from '../../models/docugen-web/Service.js';
import ServiceLookup from '../../models/docugen-web/ServiceLookup.js';
import { generatePdfFromTemplate } from './pdfRenderer.js';

const normalizePlaceholderKey = (value) => {
  if (!value || typeof value !== 'string') return '';
  return value
    .trim()
    .replace(/^\{\{\s*/, '')
    .replace(/\s*\}\}$/, '')
    .replace(/\s+/g, '_');
};

const getTemplateParametersList = (template = {}) => {
  const map = new Map();

  const metadataParams = Array.isArray(template?.metadata?.dynamicParameters)
    ? template.metadata.dynamicParameters
    : [];

  metadataParams.forEach((param) => {
    const key = normalizePlaceholderKey(param?.key || param?.name || '');
    if (!key) return;
    map.set(key, {
      key,
      label: param?.label || key,
      description: param?.description || '',
      required: Boolean(param?.required),
      type: param?.type || 'text',
      example: param?.example || '',
      allowedValues: Array.isArray(param?.allowedValues) ? param.allowedValues : undefined,
    });
  });

  const elements = Array.isArray(template?.elements) ? template.elements : [];
  elements.forEach((element) => {
    const explicitKey = normalizePlaceholderKey(element?.placeholderKey);
    if (explicitKey) {
      if (!map.has(explicitKey)) {
        map.set(explicitKey, {
          key: explicitKey,
          label: explicitKey,
          description: `Usado en ${element?.type || 'elemento'}`,
          required: true,
          type: element?.type === 'checkbox' ? 'boolean' : 'text',
          example: '',
        });
      }
    }

    const textContent = [element?.text || '', element?.qrValue || '', element?.src || ''].join(' ');
    const matches = textContent.match(/\{\{\s*([A-Za-z0-9_.-]+)\s*\}\}/g) || [];

    matches.forEach((match) => {
      const key = normalizePlaceholderKey(match);
      if (!key || map.has(key)) return;
      map.set(key, {
        key,
        label: key,
        description: `Usado en ${element?.type || 'elemento'}`,
        required: true,
        type: element?.type === 'checkbox' ? 'boolean' : 'text',
        example: '',
      });
    });
  });

  return [...map.values()].sort((a, b) => a.key.localeCompare(b.key));
};

const validateRequiredData = (template, data = {}) => {
  const requiredKeys = getTemplateParametersList(template)
    .filter((param) => param.required)
    .map((param) => param.key);

  const missing = requiredKeys.filter((key) => {
    const value = data[key];
    return value === undefined || value === null || String(value).trim() === '';
  });

  if (missing.length) {
    throw new Error(`Faltan parámetros requeridos: ${missing.join(', ')}`);
  }
};

export const listTemplates = async ({ ownerId, page, limit, search }) => {
  const result = await Template.getFilteredTemplates({
    ownerId,
    page: Number(page),
    limit: Number(limit),
    search: String(search || ''),
  });

  return result;
};

export const getTemplate = async ({ id, ownerId }) => {
  const item = await Template.findOne({ _id: id, owner: ownerId });
  if (!item) throw new Error('E2001');
  return item;
};

export const getTemplateParameters = async ({ id, ownerId }) => {
  const template = await getTemplate({ id, ownerId });
  const parameters = getTemplateParametersList(template);

  return {
    template,
    parameters,
  };
};

export const getGenerationAvailability = async ({ ownerId }) => {
  if (!ownerId) throw new Error('E2006');

  const lookup = await ServiceLookup.findServiceLookup('', 'Generación de Documentos');
  const service = await Service.findOne({
    associated_account: ownerId,
    associated_service_lookup: lookup._id,
    status: 'running',
  }).populate('associated_service_lookup');

  return {
    enabled: Boolean(service),
    service: service ? service.associated_service_lookup.name : 'Generación de Documentos',
    templateCount: await Template.countDocuments({ owner: ownerId }),
  };
};

export const createTemplate = async ({ ownerId, payload }) => {
  const template = new Template({
    owner: ownerId,
    name: payload?.name || 'Nueva plantilla',
    description: payload?.description || '',
    status: payload?.status || 'draft',
    dimensions: payload?.dimensions || { width: 794, height: 1123, unit: 'px' },
    page: payload?.page || {
      backgroundColor: '#ffffff',
      margin: { top: 40, right: 40, bottom: 40, left: 40 },
    },
    canvas: payload?.canvas || { version: 1, zoom: 1, background: '#ffffff' },
    elements: Array.isArray(payload?.elements) ? payload.elements : [],
    metadata: payload?.metadata || {},
  });

  return template.save();
};

export const updateTemplate = async ({ id, ownerId, payload }) => {
  const item = await Template.findOneAndUpdate(
    { _id: id, owner: ownerId },
    {
      $set: {
        ...(payload.name !== undefined && { name: payload.name }),
        ...(payload.description !== undefined && { description: payload.description }),
        ...(payload.status !== undefined && { status: payload.status }),
        ...(payload.dimensions !== undefined && { dimensions: payload.dimensions }),
        ...(payload.page !== undefined && { page: payload.page }),
        ...(payload.canvas !== undefined && { canvas: payload.canvas }),
        ...(payload.elements !== undefined && { elements: payload.elements }),
        ...(payload.metadata !== undefined && { metadata: payload.metadata }),
      },
    },
    { new: true }
  );

  if (!item) throw new Error('E2002');
  return item;
};

export const deleteTemplate = async ({ id, ownerId }) => {
  const item = await Template.findOneAndDelete({ _id: id, owner: ownerId });
  if (!item) throw new Error('E2003');
  return { deleted: true, id };
};

export const generateDocumentRemote = async ({ ownerId, payload, baseUrl }) => {
  const { templateId, data = {}, metadata = {} } = payload || {};

  if (!templateId) throw new Error('E2004');

  const template = await Template.findOne({ _id: templateId, owner: ownerId });
  if (!template) throw new Error('E2005');

  const availability = await getGenerationAvailability({ ownerId });
  if (!availability.enabled) throw new Error('E2007');

  validateRequiredData(template, data);

  const rendered = await generatePdfFromTemplate({
    template,
    data,
    metadata,
    baseUrl,
  });

  return {
    ...rendered,
    payload: {
      template: template.name,
      metadata,
      data,
      generatedAt: new Date().toISOString(),
    },
  };
};

export const renderTemplate = async ({ ownerId, payload, baseUrl }) => {
  const { templateId, data = {}, metadata = {} } = payload || {};

  if (!templateId) throw new Error('E2004');

  const template = await Template.findOne({ _id: templateId, owner: ownerId });
  if (!template) throw new Error('E2005');

  const rendered = await generatePdfFromTemplate({
    template,
    data,
    metadata,
    baseUrl,
  });

  return {
    ...rendered,
    payload: {
      template: template.name,
      metadata,
      data,
      generatedAt: new Date().toISOString(),
    },
  };
};
