import fs from 'node:fs/promises';
import path from 'node:path';

import PDFDocument from 'pdfkit';

const GENERATED_DIR = path.resolve(process.cwd(), 'storage', 'generated');

const resolveFieldValue = (key, payload, fallback = '') => {
  const value = payload?.[key];
  return value === undefined || value === null || value === '' ? fallback : value;
};

const drawElement = (doc, element, payload = {}) => {
  const x = Number(element.x || 0);
  const y = Number(element.y || 0);
  const width = Number(element.width || 100);
  const height = Number(element.height || 30);

  if (element.type === 'rect') {
    doc
      .save()
      .rect(x, y, width, height)
      .fill(element.fill || '#eaf2ff')
      .strokeColor(element.stroke || '#9ec5fe')
      .lineWidth(element.strokeWidth || 1)
      .stroke()
      .restore();
    return;
  }

  const textValue = element.placeholderKey
    ? resolveFieldValue(element.placeholderKey, payload, element.text || '')
    : element.text || '';

  doc
    .fontSize(element.fontSize || 16)
    .fillColor(element.color || '#111111')
    .text(String(textValue), x, y, {
      width,
      height,
      align: element.align || 'left',
      continued: false,
    });
};

export const ensurePdfStorage = async () => {
  await fs.mkdir(GENERATED_DIR, { recursive: true });
  return GENERATED_DIR;
};

export const generatePdfFromTemplate = async ({
  template,
  data = {},
  metadata = {},
  baseUrl,
} = {}) => {
  await ensurePdfStorage();

  const documentId = template?._id || `template-${Date.now()}`;
  const fileName = `${documentId}-${Date.now()}.pdf`;
  const filePath = path.join(GENERATED_DIR, fileName);

  const pageWidth = Number(template?.dimensions?.width || 794);
  const pageHeight = Number(template?.dimensions?.height || 1123);
  const margin = template?.page?.margin || { top: 40, right: 40, bottom: 40, left: 40 };

  const document = new PDFDocument({
    size: [pageWidth, pageHeight],
    margins: {
      top: margin.top || 0,
      left: margin.left || 0,
      bottom: margin.bottom || 0,
      right: margin.right || 0,
    },
    layout: 'portrait',
    bufferPages: true,
  });

  const stream = await new Promise((resolve, reject) => {
    const chunks = [];

    document.on('data', (chunk) => chunks.push(chunk));
    document.on('end', () => resolve(Buffer.concat(chunks)));
    document.on('error', reject);

    document.fillColor('#ffffff').rect(0, 0, pageWidth, pageHeight).fill();

    if (template?.page?.backgroundColor) {
      document.fillColor(template.page.backgroundColor).rect(0, 0, pageWidth, pageHeight).fill();
    }

    (template?.elements || []).forEach((element) => drawElement(document, element, data));

    document.end();
  });

  await fs.writeFile(filePath, stream);

  const resolvedBaseUrl =
    baseUrl ||
    process.env.BACKEND_URL ||
    process.env.PUBLIC_BASE_URL ||
    `http://localhost:${process.env.BACKEND_PORT || 4000}`;

  return {
    url: `${resolvedBaseUrl.replace(/\/$/, '')}/generated/${fileName}`,
    mimeType: 'application/pdf',
    fileName,
    generatedAt: new Date().toISOString(),
  };
};
