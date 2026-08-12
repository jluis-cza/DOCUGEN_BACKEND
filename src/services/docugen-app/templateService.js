import Template from '../../models/docugen-app/Template.js';
import { generatePdfFromTemplate } from './pdfRenderer.js';

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
